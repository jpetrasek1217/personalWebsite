import { BulletList, GridImg, ProjectTable } from '@/components/projects/PageBlocks';

const BASE = '/assets/creditClassifier';

const RESULTS: string[][] = [
  ['Random Forest', '79 %', 'Best performer; ensemble structure handles tabular feature interactions well'],
  ['SVM (RBF)', '72–75 %', 'Competitive; sensitive to C and gamma tuning'],
  ['Neural Network', '71 %', 'Heavy regularisation limited capacity on the minority class'],
  ['Majority-class baseline', '53 %', 'Always predicts Standard'],
  ['Random baseline', '33 %', '3-class uniform random'],
];

export default function CreditClassifier() {
  return (
    <div className='space-y-12'>
      {/* Overview */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Overview</h2>
        <p className='font-body text-body leading-relaxed'>
          A group project (Juan Reyes, Konrad Lisowski, Joseph Petrasek) for
          Applied Machine Learning that classified credit scores into three
          ordinal categories: <strong>Poor</strong>, <strong>Standard</strong>,
          and <strong>Good</strong>. Three model families were implemented from
          scratch and benchmarked against each other: a Support Vector Machine,
          a feed-forward neural network, and a random forest ensemble.
        </p>
      </section>

      {/* Dataset */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Dataset</h2>
        <p className='font-body text-body leading-relaxed'>
          Approximately <strong>36,000 labelled examples</strong> with 30
          financial behaviour features. The target classes are class-imbalanced:
          Standard is the most common, and Good is the smallest class, which
          influenced regularisation and weighting decisions for all three models.
          10-fold stratified cross-validation was used throughout so that every
          evaluation reflects the full data distribution.
        </p>
        <BulletList
          items={[
            'Numeric features: age, annual income, monthly salary, outstanding debt, credit history length, number of delayed payments, credit utilisation ratio, interest rate',
            'Categorical features: credit mix (credit cards, loans, both), payment behaviour, number of bank accounts, credit card count',
            'Target: Poor / Standard / Good (ordinal, 3-class classification)',
          ]}
        />
      </section>

      {/* Preprocessing */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Preprocessing</h2>
        <BulletList
          items={[
            'Validation rules enforced per feature: range checks, type constraints, and removal of records that failed validation',
            'One-hot encoding for categorical fields (credit mix, payment behaviour)',
            'Min-max normalisation applied to all numeric features before model training',
            'Stratified train/test splits to maintain class ratios across all folds',
          ]}
        />
      </section>

      {/* Models */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Models</h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Support Vector Machine
          </h3>
          <p className='font-body text-body leading-relaxed'>
            An RBF kernel SVM with hyperparameters C and gamma tuned via random
            search under 10-fold cross-validation. A One-vs-One multi-class
            strategy trains a separate binary classifier for each pair of
            classes. The core concept is that kernel methods project
            non-linearly separable financial data into a higher-dimensional space
            where a maximum-margin linear boundary can be found. This gives SVMs
            strong performance on structured tabular data without requiring a
            deep architecture. Achieved <strong>72–75% accuracy</strong>.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Neural Network (PyTorch)
          </h3>
          <p className='font-body text-body leading-relaxed'>
            A fully connected network with architecture{' '}
            <strong>1024 → 1024 → 512 → 512 → 64 → 3</strong>. Batch
            Normalization and Dropout (0.35 in early layers, 0.1 later) were
            applied alongside L2 regularisation (lambda = 3x10^-5) to prevent
            overfitting on the majority class. Trained with Adam at lr = 1x10^-5
            and batch size 256, with early stopping per fold. The heavy
            regularisation budget was necessary to keep the model from
            memorising the Standard class, but it also constrained capacity on
            the underrepresented Good class, which is visible in the confusion
            matrix. Achieved <strong>71% accuracy</strong>.
          </p>
          <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
            <GridImg
              src={`${BASE}/final_nn_graph.png`}
              alt='Neural network training and validation loss and accuracy curves across iterations'
              label='NN: Loss and Accuracy Curves'
            />
            <GridImg
              src={`${BASE}/grahps_nn.png`}
              alt='Neural network per-fold accuracy across k-fold cross-validation'
              label='NN: Per-fold CV Accuracy'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Random Forest</h3>
          <p className='font-body text-body leading-relaxed'>
            An ensemble of 5,000 decision trees with balanced class weights and
            stratified 10-fold cross-validation. Each tree is trained on a
            random subset of features, and the final prediction is the majority
            vote across all trees. This ensemble approach dramatically reduces
            variance compared to a single tree because individual trees overfit
            in different directions and their errors cancel out in aggregate.
            Random forests also naturally handle non-linear feature interactions
            without requiring explicit kernel choice or network architecture
            decisions. Achieved <strong>79% accuracy</strong>, the best of the
            three models.
          </p>
          <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
            <GridImg
              src={`${BASE}/final_cm_rf.png`}
              alt='Random forest confusion matrix showing per-class prediction accuracy'
              label='Random Forest: Confusion Matrix'
            />
            <GridImg
              src={`${BASE}/final_cm_nn.png`}
              alt='Neural network confusion matrix showing Good and Standard class blending'
              label='Neural Network: Confusion Matrix'
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Results</h2>
        <ProjectTable
          headers={['Model', 'Accuracy', 'Notes']}
          rows={RESULTS}
        />
      </section>

      {/* Key Findings */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Key Findings</h2>
        <BulletList
          items={[
            'Outstanding debt, credit mix, and interest rate were the three most predictive features across all models.',
            'Random Forest\'s ensemble structure is well-suited to tabular financial data at this dataset size; it outperformed the neural network without requiring careful regularisation tuning.',
            'The neural network\'s confusion matrices show significant Good/Standard blending. A larger dataset or lighter regularisation would likely close this gap.',
            'All three models substantially beat both the majority-class baseline (53%) and the random baseline (33%), confirming that the financial features carry genuine predictive signal.',
          ]}
        />
      </section>
    </div>
  );
}
