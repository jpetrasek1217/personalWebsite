import {
  BulletList,
  GridImg,
  ProjectTable,
  SectionImg,
} from '@/components/projects/PageBlocks';

const BASE = '/assets/gatekeep';

const DESIGN_REQUIREMENTS: string[][] = [
  ['Force', 'Minimal hand strength required to operate push and pull actions'],
  ['Security', 'Fully lockable with a reliable latching mechanism'],
  ['Compliance', 'CSA-compliant construction and materials'],
  [
    'Accessibility',
    'Usable by individuals with limited grip strength or reduced mobility',
  ],
];

const ENGINEERING_PROCESS: string[][] = [
  [
    'Ideation',
    'Brainstorming sessions with iterative sketches exploring grip, lever, and push-plate concepts',
  ],
  [
    'Concept Selection',
    'Designs evaluated against force, security, and compliance requirements; strongest concepts merged',
  ],
  [
    'CAD Modelling',
    'Full 3D models built in Autodesk Inventor for push-handle, pull-handle, and locking components',
  ],
  [
    'Exploded Assembly',
    'Detailed assemblies documenting part relationships, fasteners, and assembly sequence',
  ],
  [
    'Simulation & Renders',
    'Motion simulation to verify mechanism travel; photorealistic renders for presentation',
  ],
];

export default function Gatekeep() {
  return (
    <div className='space-y-12'>
      {/* Project Overview */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Project Overview</h2>
        <p className='font-body text-body leading-relaxed'>
          Gatekeep is an{' '}
          <strong>accessibility-focused door hardware system</strong> designed
          for people living with arthritis and limited hand strength. Submitted
          to <strong>MDL&apos;s CAD Designathon 2024</strong>, the project won
          the Green Propeller challenge by rethinking every aspect of how a door
          is used (push, pull, latch, and lock) rather than simply restyling the
          grip surface.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The project started from a human need, not a mechanism. The team spent
          significant time in ideation, building on each other&apos;s ideas
          across multiple brainstorming sessions before committing to a design
          direction. The result is a complete mechanical system with full CAD
          models, exploded assemblies, and motion simulations.
        </p>
      </section>

      {/* The Problem */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>The Problem</h2>
        <p className='font-body text-body leading-relaxed'>
          Traditional door hardware was designed around an average user, not
          around people whose hands hurt. For the roughly{' '}
          <strong>1 in 5 Canadians living with some form of arthritis</strong>,
          a standard round knob or stiff lever can make a door feel like a
          barrier rather than a passageway.
        </p>
        <BulletList
          items={[
            'Arthritis reduces grip strength and joint flexibility, making twisting and sustained gripping painful',
            'Existing accessible hardware was treated as a shallow solution: functional but not thoughtfully engineered',
            'The real goal was preserving independence and dignity, not just mechanical compliance',
            'Every design decision was anchored to this user population rather than aesthetics or novelty',
          ]}
        />
        <p className='font-body text-body leading-relaxed'>
          A deliberate opening question made audiences reconsider something they
          use every day:{' '}
          <em>
            &quot;Are there more ball-shaped door handles or lever-shaped door
            handles?&quot;
          </em>{' '}
          It reframes a common object and reveals an overlooked accessibility
          problem.
        </p>
      </section>

      {/* Design Requirements */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Design Requirements</h2>
        <p className='font-body text-body leading-relaxed'>
          Explicit constraints kept the project grounded in a realistic
          engineering challenge rather than a purely conceptual exercise:
        </p>
        <ProjectTable
          headers={['Requirement', 'Description']}
          rows={DESIGN_REQUIREMENTS}
        />
      </section>

      {/* Our Approach */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Our Approach</h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Human-centered design methodology
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Most student design projects start with a mechanism and search for a
            problem. This team started in the opposite order: research into how
            arthritis affects daily life came first, and every subsequent design
            decision was evaluated against that context. This kept the project
            from drifting toward solutions that look accessible without actually
            reducing effort.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Holistic door interaction
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Rather than redesigning only the grip surface, the team scoped the
            problem to cover every action a person performs when using a door:
          </p>
          <BulletList
            items={[
              'Push operation: opening a door toward you with minimal palm force',
              'Pull operation: closing or pulling a door without requiring grip or twisting',
              'Locking: a secure mechanism that does not require significant finger dexterity',
              'Latching: reliable pin/latch engagement that does not add resistance to operation',
            ]}
          />
          <p className='font-body text-body leading-relaxed'>
            This systems-thinking approach is what distinguished the submission.
            Solving only part of the interaction would have left the original
            accessibility problem partially intact.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Collaborative ideation
          </h3>
          <p className='font-body text-body leading-relaxed'>
            The team ran multiple brainstorming sessions before committing to a
            direction, deliberately building on each other&apos;s sketches and
            ideas. Concepts that addressed push well but not pull, or that
            introduced a new grip but ignored locking, were refined or combined
            rather than accepted at face value. The final design reflects many
            iterated ideas rather than the first plausible one.
          </p>
          <div className='grid grid-cols-2 gap-4 items-end justify-center w-full lg:px-40'>
            <GridImg
              src={`${BASE}/gatekeep_planning1.webp`}
              alt='Early ideation sketches exploring push and pull concepts'
              label='Ideation - Round 1'
            />
            <GridImg
              src={`${BASE}/gatekeep_planning2.webp`}
              alt='Further ideation sketches refining mechanism direction'
              label='Ideation - Round 2'
            />
          </div>
        </div>
      </section>

      {/* Mechanism Design */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Mechanism Design</h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Push handle</h3>
          <p className='font-body text-body leading-relaxed'>
            The push mechanism eliminates the need to grip entirely for
            outward-opening doors. A broad contact surface distributes force
            across the palm and forearm rather than concentrating it in the
            fingers or thumb. The mechanism interfaces with the latch to retract
            the bolt as the door is pushed, keeping the operation as a single
            continuous motion.
          </p>
          <div className='grid grid-cols-2 gap-4 items-end justify-center w-full'>
            <GridImg
              src={`${BASE}/gatekeep_pushDrawing.webp`}
              alt='Technical drawing of the push handle mechanism'
              label='Push - Drawing'
            />
            <GridImg
              src={`${BASE}/gatekeep_pushView.webp`}
              alt='CAD render of the push handle assembly'
              label='Push - Render'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Pull handle</h3>
          <p className='font-body text-body leading-relaxed'>
            The pull design replaces the need for a twisting or squeezing motion
            with a forearm or open-hand contact point. The geometry allows the
            door to be pulled open without closing the fingers around a
            traditional bar, which is the movement most painful for arthritic
            joints.
          </p>
          <div className='grid grid-cols-2 gap-4 items-end justify-center w-full'>
            <GridImg
              src={`${BASE}/gatekeep_pullDrawing.webp`}
              alt='Technical drawing of the pull handle mechanism'
              label='Pull - Drawing'
            />
            <GridImg
              src={`${BASE}/gatekeep_pullView.webp`}
              alt='CAD render of the pull handle assembly'
              label='Pull - Render'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Locking mechanism</h3>
          <p className='font-body text-body leading-relaxed'>
            The locking component was designed to be operated with a single
            low-torque motion, minimizing the pinching and twisting forces
            required by traditional thumb-turns and key cylinders. The design
            remains CSA-compliant and integrates with both the push and pull
            sides of the door without adding mechanical complexity to the
            operation.
          </p>
          <SectionImg
            src={`${BASE}/gatekeep_locking.webp`}
            alt='CAD model of the integrated locking mechanism'
          />
        </div>
      </section>

      {/* Engineering Process */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Engineering Process</h2>
        <p className='font-body text-body leading-relaxed'>
          The project moved through a full engineering development cycle within
          the competition timeline:
        </p>
        <ProjectTable
          headers={['Phase', 'Description']}
          rows={ENGINEERING_PROCESS}
        />
        <SectionImg
          src={`${BASE}/gatekeep_explodedDrawing.webp`}
          alt='Exploded assembly drawing showing all components and their relationships'
        />
        <p className='font-body text-body leading-relaxed'>
          The combination of user research, explicit design constraints,
          complete CAD implementation, and simulation verified that the team was
          designing for people, not just for technical performance.
        </p>
      </section>

      {/* Animation */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Assembly Animation</h2>
        <p className='font-body text-body leading-relaxed'>
          A motion simulation of the full assembly demonstrates how the push,
          pull, and locking components interact as a unified system.
        </p>
        <img
          src={`${BASE}/gatekeep_animation.gif`}
          alt='Gatekeep assembly animation'
          className='w-full max-w-full lg:max-w-[100%] mx-auto rounded-xl shadow-sm block'
        />
      </section>
    </div>
  );
}
