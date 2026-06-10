import {
  BulletList,
  GridImg,
  ProjectTable,
  SectionImg,
} from '@/components/projects/PageBlocks';

const BASE = '/assets/youtubeVideoEvaluator';

const FEATURES_COLLECTED: string[][] = [
  ['title', 'Video title text'],
  ['thumbnail_url_medium', 'URL of the 320×180 thumbnail image'],
  ['duration', 'Video length in ISO 8601 format'],
  ['upload_time', 'Upload timestamp (UTC, ISO 8601)'],
  ['default_language', 'Language code declared by the uploader'],
  ['views', 'View count (the prediction target)'],
  ['subscriber_count', 'Channel subscriber count at time of collection'],
  ['channel_views', 'Total views accumulated by the channel'],
  ['video_count', 'Total videos uploaded to the channel'],
  ['created_channel_at', 'Channel creation date'],
];

const CV_RESULTS: string[][] = [
  ['Fold 1', '45.1 %'],
  ['Fold 2', '45.3 %'],
  ['Fold 3', '45.9 %'],
  ['Fold 4', '45.7 %'],
  ['Fold 5', '47.8 %'],
  ['Held-out test set', '45.25 %'],
];

const TEST_REPORT: string[][] = [
  ['Class 0  (< 10¹ views)', '0.18', '0.33', '0.24'],
  ['Class 1  (10¹ – 10² views)', '0.51', '0.65', '0.57'],
  ['Class 2  (10² – 10³ views)', '0.42', '0.35', '0.39'],
  ['Class 3  (10³ – 10⁴ views)', '0.54', '0.45', '0.49'],
  ['Class 4  (10⁴ – 10⁵ views)', '0.56', '0.42', '0.48'],
  ['Class 5  (10⁵ – 10⁶ views)', '0.25', '0.59', '0.35'],
  ['Class 6  (10⁶ – 10⁷ views)', '0.09', '0.26', '0.14'],
  ['Class 7  (≥ 10⁷ views)', '0.10', '0.33', '0.15'],
];

export default function YouTubeVideoEvaluator() {
  return (
    <div className='space-y-12'>
      {/* Data Collection */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Data Collection</h2>
        <p className='font-body text-body leading-relaxed'>
          All data was collected through the{' '}
          <strong>YouTube Data API v3</strong> using Google&apos;s official
          Python client library. The dataset was assembled starting from a
          curated seed set of video IDs, which was then expanded by traversing
          channel playlists and surfacing related content, building breadth
          across categories while staying fully within the API&apos;s permitted
          usage.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The API imposes a daily quota on the number of requests that can be
          made. To work efficiently within this limit, metadata lookups were
          batched at <strong>50 video IDs per API call</strong> (the maximum
          allowed), so each quota unit returned the richest possible payload.
          Two endpoints were called per batch:{' '}
          <strong>videos.list</strong> for per-video metadata and{' '}
          <strong>channels.list</strong> for channel-level statistics. The ID
          list was randomly shuffled before processing to ensure that any
          quota-imposed cutoff mid-run would leave a representative sample
          rather than a category-biased one.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The final dataset contained <strong>72,215 labelled examples</strong>{' '}
          with the following features collected per video:
        </p>
        <ProjectTable
          headers={['Feature', 'Description']}
          rows={FEATURES_COLLECTED}
        />
      </section>

      {/* Preprocessing */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Preprocessing</h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Data filtering
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Two categories of videos were removed before training:
          </p>
          <BulletList
            items={[
              'Live streams, identified by "_live.jpg" in the thumbnail URL. Live content accumulates views under fundamentally different dynamics (real-time concurrency, replays, event-driven spikes) and would introduce systematic noise into a model trained on uploaded videos.',
              'Non-English videos: only entries with a declared language code starting with "en" were retained. Scoping to a single language removes linguistic confounds and lets the title encoder focus on one vocabulary space rather than trying to generalise across dozens.',
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Feature engineering
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Raw API fields were transformed into model-ready numeric features:
          </p>
          <BulletList
            items={[
              'Duration: ISO 8601 strings (e.g. "PT10M30S") were parsed and converted to total seconds, clamped to a minimum of 1 second.',
              'Upload time: the timestamp was decomposed into vid_hour_of_day (0–23) and vid_day_of_week (0 = Monday), capturing temporal upload patterns as two separate ordinal signals.',
              'Channel age: derived from the channel creation year as 2026 − creation_year, representing how established a channel is at upload time.',
              'Title length: character count of the video title, a lightweight proxy for titling strategy.',
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Normalisation</h3>
          <p className='font-body text-body leading-relaxed'>
            View counts, subscriber counts, channel view totals, and video
            duration all follow heavily right-skewed, near-log-normal
            distributions; a handful of viral videos or mega-channels would
            otherwise dominate gradient updates.{' '}
            <strong>log1p normalization</strong> was applied first to compress
            these distributions, followed by <strong>min-max scaling</strong>{' '}
            to [0, 1] across all numeric inputs. This two-step approach keeps
            the features well-conditioned without discarding the relative
            ordering information that matters for a popularity prediction task.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Classification target
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Rather than treating view count as a continuous regression target,
            it was binned into <strong>8 ordinal classes</strong> using
            equal-width bins on the log-normalized distribution. This
            framing is more stable: the extreme long-tail of views makes raw
            regression poorly defined (a model can be arbitrarily far off on
            viral outliers), while the ordinal classes give the model a
            well-bounded output space that still preserves meaningful ordering.
            Each class roughly corresponds to one order of magnitude of views.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Thumbnail processing
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Thumbnail images were downloaded from the medium-resolution URLs
            (320×180) in batches of 256, then resized and centre-cropped to{' '}
            <strong>128×128 RGB tensors</strong>. Any download failures were
            replaced with zero tensors to keep the dataset intact. Processed
            batches were saved as PyTorch <code>.pt</code> files to avoid
            re-downloading on subsequent training runs.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Train / test split</h3>
          <p className='font-body text-body leading-relaxed'>
            The cleaned dataset was split <strong>95 % / 5 %</strong> into a
            train-validation pool and a held-out test set. The 95 % pool was
            further divided using{' '}
            <strong>5-fold stratified cross-validation</strong>, so every
            example contributes to both training and validation across the folds
            and evaluation is not sensitive to any single random split. The
            model was trained with a batch size of 128.
          </p>
        </div>
      </section>

      {/* Model Architecture */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Model Architecture</h2>
        <p className='font-body text-body leading-relaxed'>
          The model is a <strong>hybrid multimodal neural network</strong> with
          four parallel input branches (one per modality) whose
          embeddings are concatenated and passed through a shared fusion head
          for final classification.
        </p>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Branch 1: Thumbnail image (ResNet50)
          </h3>
          <p className='font-body text-body leading-relaxed'>
            An <strong>ImageNet-pretrained ResNet50</strong> is used as a
            feature extractor: the final classification layer is removed, and
            the convolutional trunk produces a <strong>2048-dimensional</strong>{' '}
            image embedding per thumbnail. The architecture begins with a
            zero-padded 7×7 convolution followed by Batch Normalization, ReLU,
            and Max Pooling, then passes through four stages of alternating
            convolutional and identity residual blocks, and ends with global
            average pooling and a fully connected projection.
          </p>
          <p className='font-body text-body leading-relaxed'>
            Batch Normalization after the first convolution stabilises the early
            feature map statistics across a batch of 128 images, while the
            residual connections allow clean gradient flow through all 50 layers
            without the vanishing gradient problem that limited deep networks
            before their introduction.
          </p>
          <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
            <GridImg
              src={`${BASE}/evaluator_resnet.webp`}
              alt='ResNet50 architecture diagram showing the convolutional pipeline'
              label='ResNet50: Image Branch'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Branch 2: Video title (DeBERTa-v3-base)
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Video titles are encoded using{' '}
            <strong>microsoft/deberta-v3-base</strong>, a transformer trained
            on a large text corpus. The encoder weights are{' '}
            <strong>frozen</strong> during training; the model leverages the
            rich semantic representations already learned during pre-training
            rather than fine-tuning from scratch, which would require far more
            data and compute. Titles are tokenized to a maximum of 32 tokens
            with padding; the last hidden states are aggregated via{' '}
            <strong>masked mean pooling</strong> (padding tokens are excluded
            from the average) to produce a single sequence-level representation.
          </p>
          <p className='font-body text-body leading-relaxed'>
            DeBERTa&apos;s key distinction over earlier transformers is its{' '}
            <strong>disentangled attention mechanism</strong>: rather than
            encoding content and position together in a single embedding vector,
            it maintains separate representations and combines them through a
            relative position bias matrix (visible on the right of the diagram
            below). This lets the model better capture how word meaning changes
            depending on position, useful for titles where word order and
            emphasis carry signal about a video&apos;s intent.
          </p>
          <p className='font-body text-body leading-relaxed'>
            A projection head maps the 768-dimensional pooled output to 256
            dimensions:{' '}
            <strong>
              Linear(768→256) → Layer Normalization → Dropout(0.1)
            </strong>
            . Layer Normalization is used here instead of Batch Normalization
            because transformer hidden states are sequence-length dependent;
            Layer Norm normalises each sample independently across its own
            feature dimension, which is correct for variable-length token
            sequences. Batch Normalization computes statistics across the batch
            dimension, which would be destabilised by the variable padding
            present across examples.
          </p>
          <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
            <GridImg
              src={`${BASE}/evaluator_deberta.webp`}
              alt='DeBERTa-v3 architecture diagram showing disentangled attention and relative position embeddings'
              label='DeBERTa-v3-base: Title Branch'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Branch 3: Numeric metadata (MLP)
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Six numeric features (duration, title length, subscriber count,
            total channel views, total video count, channel age) are passed
            through a small fully connected network:{' '}
            <strong>
              BatchNorm(6) → Linear(6→64) → ReLU → Linear(64→64) → ReLU
            </strong>
            .
          </p>
          <p className='font-body text-body leading-relaxed'>
            Batch Normalization is applied directly at the input rather than
            after the first linear layer. Because the six features are
            heterogeneous: subscriber count and channel views span orders of
            magnitude even after log normalization, while title length and day
            of week are far smaller, and re-centering and scaling at the entry
            point prevents any single feature from dominating the weight
            updates.
          </p>
          <p className='font-body text-body leading-relaxed'>
            No dropout is applied in this branch. The branch has only six input
            dimensions; randomly zeroing any fraction of these during training
            would remove too much signal per step and impede convergence; the
            regularisation pressure that dropout provides is more valuable in
            the higher-dimensional fusion head.
          </p>
          <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
            <GridImg
              src={`${BASE}/evaluator_numeric.webp`}
              alt='Numeric MLP architecture showing batch normalization at input followed by two fully connected layers'
              label='Numeric MLP: Metadata Branch'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Branch 4: Upload timing (learned embeddings)
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Hour of upload (0–23) and day of week (0–6) are treated as
            categorical features and encoded with{' '}
            <strong>learned embedding tables</strong>:{' '}
            <strong>Embedding(24, 8)</strong> for hour and{' '}
            <strong>Embedding(7, 4)</strong> for day of week. These 12
            concatenated dimensions are passed through{' '}
            <strong>
              Linear(12→64) → ReLU → Dropout(0.2) → LayerNorm(64) →
              Linear(64→32)
            </strong>
            .
          </p>
          <p className='font-body text-body leading-relaxed'>
            Dropout is applied in this branch because learned embedding spaces
            are particularly prone to overfitting on small categorical
            vocabularies. Without it, the model can memorise that videos
            uploaded at a specific hour on a specific day tend to land in a
            particular view bucket in the training set, rather than learning a
            generalised pattern. Forcing some embedding dimensions to zero
            during training prevents this co-adaptation.
          </p>
          <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
            <GridImg
              src={`${BASE}/evaluator_metadata.webp`}
              alt='Metadata encoder architecture showing fully connected layers with dropout'
              label='Upload Timing: Metadata Branch'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Fusion head</h3>
          <p className='font-body text-body leading-relaxed'>
            The four branch embeddings are concatenated into a single{' '}
            <strong>2400-dimensional</strong> vector (2048 + 256 + 64 + 32) and
            passed through three successive blocks of{' '}
            <strong>
              Linear → Batch Normalization → Dropout → ReLU
            </strong>{' '}
            (dimensions 2400→1024→256→256), followed by a final{' '}
            <strong>Linear(256→8)</strong> classification layer.
          </p>
          <p className='font-body text-body leading-relaxed'>
            Batch Normalization at each fusion layer is critical here: the
            concatenated input spans fundamentally different representational
            spaces: CNN feature maps, transformer embeddings, and normalized
            tabular values all live on different scales and have different
            statistical properties. Batch Normalization re-centres and rescales
            each layer&apos;s activations so the optimizer encounters a stable
            loss landscape regardless of which modality is currently contributing
            the most signal.
          </p>
          <p className='font-body text-body leading-relaxed'>
            Dropout is applied at 0.3 in the first fusion layer and 0.1 in
            subsequent layers. With four independent input pathways, the model
            has ample opportunity to over-rely on one modality, for example
            learning that subscriber count alone is sufficient while ignoring
            thumbnail content. Higher dropout at the widest layer prevents this
            kind of modality collapse early in the network, while lower dropout
            in later layers preserves the finer-grained representations that
            have already been distilled.
          </p>
          <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
            <GridImg
              src={`${BASE}/evaluator_head.webp`}
              alt='Fusion head architecture showing repeated FC-BatchNorm-Dropout-ReLU blocks'
              label='Fusion Head'
            />
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='font-header font-black text-h3'>
            Training and results
          </h3>
          <p className='font-body text-body leading-relaxed'>
            The model was trained with the <strong>AdamW</strong> optimizer
            (lr 2×10⁻⁴, weight decay 10⁻⁴) and a cosine-annealed learning rate
            schedule with a 10-epoch linear warmup. A{' '}
            <strong>class-weighted cross-entropy loss</strong> was used to
            counteract the severe class imbalance in the view distribution;
            viral videos in the upper buckets represent a small fraction of the
            dataset, and without reweighting the model would simply learn to
            predict the most common class. Early stopping with a patience of 3
            epochs triggered at epochs 7–8 across all folds, preventing
            overfitting in the face of high training accuracy diverging from
            validation.
          </p>
          <p className='font-body text-body leading-relaxed'>
            Across the 5 folds, validation accuracy ranged from{' '}
            <strong>45.1 % to 47.8 %</strong>, with the held-out test set
            confirming <strong>45.25 %</strong> accuracy and a weighted F1 of
            0.46:
          </p>
          <ProjectTable
            headers={['Split', 'Accuracy']}
            rows={CV_RESULTS}
          />
          <p className='font-body text-body leading-relaxed'>
            For an 8-class ordinal problem where random guessing yields only{' '}
            <strong>12.5 %</strong>, this represents a strong proof of concept.
            The confusion matrices across all folds reveal an important
            qualitative result: the vast majority of misclassifications are{' '}
            <strong>off by exactly one bucket</strong>: the model understands
            the ordinal structure of the problem even when it gets the exact bin
            wrong. The hardest classes to predict are the extreme ends, very
            low-view and viral videos, which is expected given how few examples
            exist at the tails.
          </p>
          <ProjectTable
            headers={['Class', 'Precision', 'Recall', 'F1']}
            rows={TEST_REPORT}
          />
          <p className='font-body text-body leading-relaxed'>
            The mid-range classes (1–4), which represent the bulk of the
            dataset, show the strongest performance with F1 scores of 0.39–0.57.
            Improvement paths for future versions include a larger and more
            balanced dataset, fine-tuning the DeBERTa encoder on video title
            data, and ensemble methods across multiple training runs.
          </p>
        </div>
      </section>

      {/* Web Application */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Web Application</h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Frontend</h3>
          <p className='font-body text-body leading-relaxed'>
            The UI is built in <strong>Next.js</strong> with{' '}
            <strong>react-hook-form</strong> for form state and validation. The
            form mirrors the full feature set the model was trained on: a
            thumbnail upload field, video title, video length, upload day and
            hour, channel subscriber count, total channel views, total video
            count, and channel age. Each field has a client-side validator
            enforcing valid ranges (e.g. hour 0–23, non-negative counts) before
            the request is sent, keeping the API free of invalid inputs.
          </p>
          <p className='font-body text-body leading-relaxed'>
            Thumbnail upload uses a drag-and-drop dropzone. The selected image
            is <strong>base64-encoded in the browser</strong> and included
            directly in the JSON POST body, eliminating a separate file upload
            step and keeping the API surface simple. A preview of the uploaded
            thumbnail is shown in the form so the user can confirm the correct
            image was selected before submitting.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Backend and inference
          </h3>
          <p className='font-body text-body leading-relaxed'>
            The inference server is a <strong>FastAPI</strong> application. At
            startup, the trained model weights are downloaded from{' '}
            <strong>Hugging Face Hub</strong> (
            <code>josephpetrasek/youtube-video-evaluator</code>) and loaded into
            GPU or CPU memory. The model is loaded once and held for the
            lifetime of the process, so subsequent requests pay no loading cost.
          </p>
          <p className='font-body text-body leading-relaxed'>
            Incoming requests are validated with <strong>Pydantic</strong>{' '}
            before any computation occurs: numeric fields are checked for
            non-negative values, hour and day are range-checked, and a thumbnail
            is required. The preprocessing pipeline inside the endpoint mirrors
            the training pipeline exactly: log normalization and min-max scaling
            are applied to numeric features using the same constants derived
            during data preparation, the thumbnail is decoded from base64,
            resized and cropped to 128×128, and the title is tokenized by
            DeBERTa&apos;s tokenizer to the same 32-token sequence length used
            during training. Keeping the inference pipeline identical to
            training is essential; any discrepancy between the two would silently
            degrade predictions.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Output</h3>
          <p className='font-body text-body leading-relaxed'>
            The model returns an integer class label from 0 to 7. The UI
            translates this into a human-readable estimated view range displayed
            as an <strong>order-of-magnitude interval</strong>, for example
            class 4 is presented as &quot;10,000 – 100,000 views.&quot; This
            framing communicates the model&apos;s inherent uncertainty honestly:
            rather than claiming a precise view count, it conveys that the video
            is likely to land within a particular magnitude, which is a more
            defensible claim for a notoriously noisy prediction problem.
          </p>
        </div>
      </section>
    </div>
  );
}
