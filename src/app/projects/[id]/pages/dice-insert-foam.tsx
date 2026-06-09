import {
  SectionImg,
  GridImg,
  BulletList,
  ProjectTable,
} from '@/components/projects/PageBlocks';

const BASE = '/assets/odysseyDice';

const DIMENSIONAL_CONSTRAINTS = [
  ['Box Width', '90 mm'],
  ['Box Length', '127 mm'],
  ['Box Height', '30 mm'],
  ['Material', 'Polyurethane Foam'],
  ['Dice Protrusion', '2–4 mm above foam'],
];

const DICE_DIMENSIONS = [
  ['d20', '21.5 mm / 26.5 mm', 'Face-to-face / Tip-to-tip'],
  ['d12', '20.5 mm', 'Face-to-face'],
  ['d10', '26 mm', 'Point-to-point'],
  ['d10 Percentile', '26 mm', 'Point-to-point'],
  ['d8', '27 mm', 'Point-to-point'],
  ['d6', '16 mm', 'Face-to-face'],
  ['d4', '20.1 mm', 'Base-to-point'],
  ['Crystal', '14 × 11.5 × 25.5 mm', 'Height × Width × Length'],
];

const SKILLS = [
  'Mechanical Design',
  'CAD Modeling',
  'Design for Manufacturability (DFM)',
  'Tolerance Consideration',
  'Product Packaging Design',
  'Rapid Prototyping & Development',
  'Client Requirement Analysis',
  'Technical Communication',
];

export default function DiceInsertFoam() {
  return (
    <div className='space-y-12'>
      {/* Project Overview */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Project Overview</h2>
        <p className='font-body text-body leading-relaxed'>
          The Odyssey Dice Insert Foam project involved designing a custom
          polyurethane foam insert for a complete tabletop RPG dice set. The
          insert was commissioned for a growing small business,{' '}
          <strong>Odyssey Dice</strong>, which required a professional packaging
          solution capable of securely holding and displaying a full set of
          thirteen dice.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The project operated under a highly compressed timeline. The foam mold
          design needed to be completed within a single weekend so that the
          manufacturing partner could begin production and meet an upcoming
          release deadline.
        </p>
      </section>

      {/* My Contribution */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>My Contribution</h2>
        <p className='font-body text-body leading-relaxed'>
          As the sole designer on this project, I was responsible for
          transforming the client&apos;s packaging requirements into a
          manufacturable foam insert design under a highly compressed timeline.
        </p>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Responsibilities</h3>
          <BulletList
            items={[
              'Gathered and interpreted client requirements, reference images, and dimensional data for all 13 dice.',
              'Developed the overall foam insert layout to fit within the packaging constraints.',
              'Designed individual cavities for each die type, balancing retention, accessibility, and visual presentation.',
              'Calculated cavity depths to ensure each die protruded 2–4 mm above the foam surface while remaining securely seated.',
              'Created CAD models and production-ready geometry suitable for external foam manufacturing processes.',
              'Iterated on cavity dimensions and spacing to optimize packaging density without compromising usability.',
              "Delivered the completed design package within a single weekend to support the client's production schedule.",
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Engineering Skills Demonstrated
          </h3>
          <div className='flex flex-wrap gap-2'>
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className='px-3 py-1 rounded-full bg-dark/10 text-dark font-header font-black text-caption'>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Project Constraints
          </h3>
          <p className='font-body text-body leading-relaxed'>
            This project was completed under significant time pressure,
            requiring the entire design to be developed, validated, and
            delivered within approximately two days. The final design
            successfully met all dimensional, aesthetic, and manufacturing
            requirements, enabling production to proceed on schedule.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Results</h3>
          <BulletList
            items={[
              'Delivered final design within 48 hours.',
              'Created a production-ready foam insert for a complete 13-piece dice set.',
              'Successfully met packaging dimensions of 90 mm × 127 mm × 30 mm.',
              "Enabled manufacturing to proceed without delaying the client's product launch timeline.",
            ]}
          />
        </div>
      </section>

      {/* Abstract */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Abstract</h2>
        <p className='font-body text-body leading-relaxed'>
          A friend commissioned me to develop a custom foam insert for Odyssey
          Dice&apos;s full dice set packaging. The insert would be manufactured
          externally and integrated into retail packaging for premium dice sets.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The primary challenge was creating a design that:
        </p>
        <BulletList
          items={[
            'Securely held all 13 dice during shipping and handling',
            'Presented the dice attractively to customers',
            'Met strict packaging dimensions',
            'Conformed to manufacturing requirements for polyurethane foam production',
            'Was completed within an extremely short turnaround window',
          ]}
        />
        <p className='font-body text-body leading-relaxed'>
          Despite the tight deadline, the design was completed and delivered in
          time for manufacturing.
        </p>
      </section>

      {/* Design Requirements */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Design Requirements</h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Functional Requirements
          </h3>
          <p className='font-body text-body'>The foam insert needed to:</p>
          <BulletList
            items={[
              'Hold a complete 13-piece dice set securely',
              'Prevent movement during transportation and delivery',
              'Present each die in a visually appealing orientation',
              'Display the highest-value face whenever possible',
              'Allow dice to protrude slightly above the foam surface for easy removal',
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Dimensional Constraints
          </h3>
          <ProjectTable
            headers={['Requirement', 'Value']}
            rows={DIMENSIONAL_CONSTRAINTS}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Maximum Depth Requirements
          </h3>
          <SectionImg
            src={`${BASE}/odysseyDice_maxDepth.webp`}
            alt='Maximum depth requirements of dice'
          />
        </div>
      </section>

      {/* Client References & Measurements */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>
          Client References & Measurements
        </h2>
        <p className='font-body text-body leading-relaxed'>
          The client supplied reference images and dimensional information for
          each die type.
        </p>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Crystal Reference Images
          </h3>
          <div className='flex gap-4 items-start justify-center'>
            {' '}
            <GridImg
              src={`${BASE}/odysseyDice_crystalAlone.webp`}
              alt='Crystal reference'
              label='Reference'
            />
            <GridImg
              src={`${BASE}/odysseyDice_crystalWidth.webp`}
              alt='Crystal width measurement'
              label='Width'
            />
            <GridImg
              src={`${BASE}/odysseyDice_crystalHeight.webp`}
              alt='Crystal height measurement'
              label='Height'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Dice Dimensions</h3>
          <ProjectTable
            headers={['Component', 'Dimension', 'Measurement Method']}
            rows={DICE_DIMENSIONS}
          />
          <SectionImg
            src={`${BASE}/odysseyDice_finalCutFoam.webp`}
            alt='Crystal die cavity diagram'
          />
        </div>
      </section>

      {/* Design Process */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Design Process</h2>
        <p className='font-body text-body leading-relaxed'>
          Each die type required a dedicated cavity geometry designed to
          securely constrain movement, allow easy removal by the user, maintain
          visual consistency across the package, and respect manufacturing
          limitations of foam cutting processes.
        </p>

        <div className='flex gap-2 sm:gap-4 items-start justify-center'>
          <GridImg
            src={`${BASE}/odysseyDice_d20.webp`}
            alt='D20 cavity'
            label='D20'
          />
          <GridImg
            src={`${BASE}/odysseyDice_d12.webp`}
            alt='D12 cavity'
            label='D12'
          />
          <GridImg
            src={`${BASE}/odysseyDice_d10.webp`}
            alt='D10 cavity'
            label='D10 / Percentile'
          />
        </div>

        <div className='flex gap-2 sm:gap-4 items-start justify-center'>
          <GridImg
            src={`${BASE}/odysseyDice_d8.webp`}
            alt='D8 cavity'
            label='D8'
          />
          <GridImg
            src={`${BASE}/odysseyDice_d6.webp`}
            alt='D6 cavity'
            label='D6'
          />
        </div>
        <div className='flex gap-2 sm:gap-4 items-start justify-center'>
          <GridImg
            src={`${BASE}/odysseyDice_d4.webp`}
            alt='D4 cavity'
            label='D4'
          />
          <GridImg
            src={`${BASE}/odysseyDice_crystal.webp`}
            alt='Crystal cavity'
            label='Crystal'
          />
        </div>
      </section>

      {/* Final Foam Layout */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Final Foam Layout</h2>
        <p className='font-body text-body leading-relaxed'>
          After validating each cavity design, the individual features were
          integrated into a single foam insert layout optimized for
          manufacturing and packaging.
        </p>
        <SectionImg
          src={`${BASE}/odysseyDice_finalCutFoam.webp`}
          alt='Final cut foam design'
        />

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Engineering Drawing
          </h3>
          <p className='font-body text-body leading-relaxed'>
            The final production-ready drawing specified all critical dimensions
            required for manufacturing.
          </p>
          <SectionImg
            src={`${BASE}/odysseyDice_engDrawing.webp`}
            alt='Final cut foam engineering drawing'
          />
        </div>
      </section>

      {/* Final Product */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Final Product</h2>
        <p className='font-body text-body leading-relaxed'>
          The completed foam insert successfully met all design objectives and
          proceeded to manufacturing.
        </p>
        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Outcomes</h3>
          <BulletList
            items={[
              'Secure retention of all 13 dice',
              'Reduced movement during shipping',
              'Professional presentation within retail packaging',
              'Compliance with client dimensional requirements',
              'Successful completion within the required timeline',
            ]}
          />
        </div>
      </section>

      {/* Key Engineering Takeaways */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          Key Engineering Takeaways
        </h2>
        <p className='font-body text-body leading-relaxed'>
          This project demonstrates:
        </p>
        <BulletList
          items={[
            'Rapid product development under tight deadlines',
            'Design for manufacturability (DFM)',
            'Packaging and consumer product design',
            'CAD-based cavity optimization',
            'Client-driven engineering design processes',
          ]}
        />
        <p className='font-body text-body leading-relaxed'>
          The final insert balanced aesthetics, manufacturability, protection,
          and user experience while meeting strict production constraints.
        </p>
      </section>
    </div>
  );
}
