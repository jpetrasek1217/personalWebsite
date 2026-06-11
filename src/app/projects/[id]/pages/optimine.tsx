import {
  BulletList,
  GridImg,
  SectionImg,
  VideoEmbed,
} from '@/components/projects/PageBlocks';

const BASE = '/assets/optimine';

export default function Optimine() {
  return (
    <div className='space-y-12'>
      {/* Overview */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Overview</h2>
        <p className='font-body text-body leading-relaxed'>
          Optimine was a mechatronics capstone project to retrofit a legacy
          shaft-sinking derrick with an electric drive system, enabling{' '}
          <strong>semi-autonomous swing-axis control</strong> and targeting a
          25% reduction in cycle time. The project spanned mechanical redesign,
          dynamic simulation, PLC control system development, operator interface
          design, and formal safety documentation.
        </p>
        <SectionImg
          src={`${BASE}/optimine_derrick.png`}
          alt='The shaft-sinking derrick equipment targeted for retrofit'
        />
      </section>

      {/* Challenge */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>The Challenge</h2>
        <p className='font-body text-body leading-relaxed'>
          The original equipment used a manual system for swing-axis
          positioning: slow, entirely operator-dependent, and incompatible with
          any automation layer. The core engineering challenge was to replace
          that with an electric motor and gearbox assembly capable of
          semi-autonomous operation, without modifying the structural frame of
          the crane and while satisfying the thermal and mechanical demands of
          continuous industrial duty cycles.
        </p>
        <div className='flex flex-wrap gap-4 items-end justify-center w-full lg:px-40'>
          <GridImg
            src={`${BASE}/IMG_8408.jpg`}
            alt='Project team working on the Optimine system'
            label='System Integration'
          />
        </div>
      </section>

      {/* My Contributions: Mechanical */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>
          Contributions: Mechanical Design
        </h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Motor and Gearbox Selection
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Performed torque and inertia analysis on the swing axis to
            characterise the load profile across the full duty cycle. The
            analysis accounted for peak torque demand, rotational inertia of the
            moving mass, and thermal limits over repeated cycles. Those results
            were used to define motor and gearbox sizing requirements, which
            were then validated against the driveline's force requirements to
            confirm the selection would hold under worst-case loading
            conditions.
          </p>
          <div className='flex flex-wrap gap-4 items-end justify-center w-full lg:px-40'>
            <GridImg
              src={`${BASE}/optimine_motor.webp`}
              alt='Selected electric motor for the Optimine swing-axis drive system'
              label='Selected Motor'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            External Drivetrain Design
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Designed the external driveline connecting the motor output shaft to
            the existing mechanical interface of the crane. This involved
            selecting gear ratios to match motor speed to the required output
            speed range, laying out the mechanical assembly to fit within the
            existing equipment envelope, and calculating structural loads to
            verify that all components were appropriately sized for the applied
            forces.
          </p>
          <div className='flex flex-wrap gap-4 items-end justify-center w-full lg:px-40'>
            <GridImg
              src={`${BASE}/optimine_bullgear.jpg`}
              alt='Bull gear and pinion combination designed for the Optimine external drivetrain'
              label='Bull Gear and Pinion'
            />
          </div>
        </div>
      </section>

      {/* My Contributions: Simulation */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          Contributions: Simulation
        </h2>
        <p className='font-body text-body leading-relaxed'>
          Built a <strong>MATLAB Simulink Multibody</strong> model to simulate
          system dynamics before any hardware was installed. This allowed the
          team to validate the mechanical design and control concept virtually
          and identify issues before physical integration.
        </p>
        <BulletList
          items={[
            'Imported CAD geometry with aligned reference frames to accurately represent the physical crane geometry in the simulation environment',
            'Implemented a torque-based driveline model with gear ratios derived from velocity command inputs, reflecting the actual mechanical transmission',
            'Modelled contact forces between convex bodies to simulate real mechanical interactions at the swing joint',
            'Developed a belt-cable subsystem to simulate load suspension behaviour and capture the dynamics of the hanging payload',
            "Conducted sim-to-real validation calculations and consulted industry experts to verify that the simulation's dynamic response was realistic and within scope",
            'Added system observability through signal probes, visualisation graphs, and data acquisition outputs to monitor behaviour across test scenarios and support debugging',
          ]}
        />
        <img
          src={`${BASE}/optimine_simulation.gif`}
          alt='Simulink Multibody simulation of the Optimine drivetrain in motion'
          className='w-full max-w-full lg:max-w-[60%] mx-auto rounded-xl shadow-sm block'
        />
      </section>

      {/* Project Scope */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Full Project Scope</h2>
        <p className='font-body text-body leading-relaxed'>
          Beyond the mechanical and simulation work, the project included a
          PLC-based control algorithm for automated swing-axis positioning using
          sensor feedback, an operator HMI for real-time system monitoring,
          control mode selection, and fault diagnostics. A full suite of safety
          documentation was also authored, covering hazard analysis, system
          requirements, and verification and validation reporting.
        </p>
      </section>

      {/* Expo Photos */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Optimine at Expo</h2>
        <div className='flex flex-wrap gap-4 items-end justify-center w-full lg:px-40'>
          <GridImg
            src={`${BASE}/optimine_expo.jpg`}
            alt='Optimine team presenting their project at the McMaster capstone expo'
            label='Expo Presentation'
          />
          <GridImg
            src={`${BASE}/optimine_expo2.jpg`}
            alt='Optimine team demonstrating the system to expo visitors'
            label='Expo Demo'
          />
        </div>
      </section>

      {/* Demo Video */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Optimine Video</h2>
        <VideoEmbed
          src='https://drive.google.com/file/d/1suYYnMQbSwm8ThbXkR_D3T3qAy14kqfa/preview'
          title='Optimine Capstone Demo'
        />
      </section>

      {/* NDA Note */}
      <section>
        <p className='font-body text-body leading-relaxed italic text-dark/60'>
          This project was completed under a non-disclosure agreement. Specific
          design parameters, control logic, and internal documentation cannot be
          shared publicly. This page describes the project at the level of
          concepts, architecture, and contributions.
        </p>
      </section>
    </div>
  );
}
