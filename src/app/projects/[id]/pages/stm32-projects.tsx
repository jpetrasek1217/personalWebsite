import { GridImg } from '@/components/projects/PageBlocks';

const BASE = '/assets/stm32';

export default function Stm32Projects() {
  return (
    <div className='space-y-12'>
      {/* Intro */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Overview</h2>
        <p className='font-body text-body leading-relaxed'>
          Five firmware projects built on the{' '}
          <strong>STM32F429ZI Discovery Kit</strong> (Arm Cortex-M4), which
          includes an integrated LCD touchscreen, joystick, and onboard
          peripherals. Each project targets a distinct embedded systems concept,
          ordered below from foundational to more complex multi-protocol
          communication.
        </p>
      </section>

      {/* 1. Reaction Time Game */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          1. Reaction Time Game
        </h2>
        <p className='font-body text-body leading-relaxed'>
          <strong>Concept: Finite State Machines and Debounced GPIO</strong>
        </p>
        <p className='font-body text-body leading-relaxed'>
          A game that measures a user's reaction time after a randomised delay.
          The firmware is structured as a four-state machine: RESTART, READY,
          WAIT, and START_TIMER. A random countdown of 1 to 5 seconds fires
          before the green LED triggers; pressing the joystick during the
          countdown registers as a cheat. High score and current score are
          tracked and displayed on the LCD.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The key embedded concept is{' '}
          <strong>state machine architecture</strong>: giving each state a
          single, well-defined responsibility and a clear entry condition. This
          is the fundamental pattern that makes complex embedded behaviour
          testable and maintainable, because any bug can be traced to a specific
          state rather than to tangled global logic.
        </p>
        <div className='flex flex-wrap gap-4 items-end justify-center w-full lg:px-40'>
          <GridImg
            src={`${BASE}/stm32_reactionTimeChart.png`}
            alt='State machine diagram for the reaction time game showing state transitions'
            label='State Machine Diagram'
          />
        </div>
      </section>

      {/* 2. Sound-Triggered Fan */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          2. Sound-Triggered Fan Controller
        </h2>
        <p className='font-body text-body leading-relaxed'>
          <strong>Concept: Interrupt-Driven Programming and PWM</strong>
        </p>
        <p className='font-body text-body leading-relaxed'>
          A fan whose speed responds to ambient sound level. A sound sensor
          triggers hardware interrupts that increment a sound accumulator; the
          PWM duty cycle driving the fan is proportional to that accumulator,
          and it decays every 100 ms when no sound is detected. The circuit
          drives the fan via a MOSFET gate with an appropriate current-limiting
          resistor and flyback protection.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The key concept is <strong>interrupt-driven I/O</strong>: the CPU does
          not poll the sensor in a loop but reacts immediately when the hardware
          signals an event. This frees the processor to do other work between
          events and enables responsive real-time behaviour that polling cannot
          reliably achieve.
        </p>
        <div className='grid sm:grid-cols-2 gap-4 items-end justify-center w-full lg:px-40'>
          <GridImg
            src={`${BASE}/stm32_screamFanCircuit.png`}
            alt='Circuit schematic for the sound-triggered fan including MOSFET gate driver'
            label='Fan Circuit Schematic'
          />
          <GridImg
            src={`${BASE}/stm32_screamFanChart.png`}
            alt='Data flow diagram for the sound-triggered fan controller'
            label='System Data Flow'
          />
        </div>
      </section>

      {/* 3. Temperature-Controlled Fan */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          3. Temperature-Controlled Fan
        </h2>
        <p className='font-body text-body leading-relaxed'>
          <strong>
            Concept: Analogue-to-Digital Conversion and Hysteresis Control
          </strong>
        </p>
        <p className='font-body text-body leading-relaxed'>
          A fan controller that reads a temperature sensor on PA_0 via the ADC,
          displays the current temperature and a user-adjustable threshold on
          the LCD touchscreen, and ramps fan speed via PWM based on how far
          above the threshold the temperature sits. The threshold can be
          adjusted in 0.5 degree increments via touchscreen buttons.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The key concept is <strong>hysteresis in feedback control</strong>: a
          small offset is applied so the fan turns on at threshold plus 0.3
          degrees and turns off at threshold minus 0.3 degrees. Without this
          band, a signal hovering at exactly the threshold would cause rapid
          on/off cycling that creates mechanical wear and electrical noise.
          Hysteresis is a widely used technique in thermostats, motor drivers,
          and comparator circuits for exactly this reason.
        </p>
        <div className='flex flex-wrap gap-4 items-end justify-center w-full lg:px-80'>
          <GridImg
            src={`${BASE}/stm32_tempControlChart.PNG`}
            alt='Data flow diagram for the temperature-controlled fan system'
            label='System Data Flow'
          />
        </div>
      </section>

      {/* 4. Stepper Motor Controller */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          4. Stepper Motor Controller
        </h2>
        <p className='font-body text-body leading-relaxed'>
          <strong>Concept: Motor Control and Step Sequencing</strong>
        </p>
        <p className='font-body text-body leading-relaxed'>
          A joystick-controlled stepper motor driver for the 26M048B1B motor,
          supporting full-step (7.5 degree resolution) and half-step (3.75
          degree resolution) modes, selectable via button. Five debounced
          buttons control mode, direction, and speed. The LCD displays the
          current step mode, speed setting, and direction. The firmware's state
          machine manages three states: MOTOR_OFF, MOTOR_FULL_STEP, and
          MOTOR_HALF_STEP.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The key concept is <strong>step-sequence tables</strong>: full-step
          and half-step modes energise the motor coils in different patterns to
          trade torque for angular resolution. Full-step activates one or two
          coils at a time for maximum torque; half-step interleaves single and
          dual coil activation to halve the step angle at the cost of slightly
          reduced torque. Understanding these patterns is foundational for
          controlling any stepper-driven system, from 3D printers to CNC
          machines.
        </p>
        <div className='flex flex-wrap gap-4 items-end justify-center w-full lg:px-40'>
          <GridImg
            src={`${BASE}/stm32_motorChart.png`}
            alt='Data flow diagram for the stepper motor controller'
            label='System Data Flow'
          />
        </div>
      </section>

      {/* 5. Time Keeping with EEPROM */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          5. RTC Time Keeping with External EEPROM
        </h2>
        <p className='font-body text-body leading-relaxed'>
          <strong>
            Concept: I2C Protocol and Persistent Non-Volatile Storage
          </strong>
        </p>
        <p className='font-body text-body leading-relaxed'>
          A time management system combining the MCU's internal real-time clock
          with an external 24C256 EEPROM over I2C. A 9-state machine handles
          time editing (year, month, day, hour, minute, second), and up to two
          time values can be saved to and read back from EEPROM, persisting
          across power cycles. Both stored times are displayed on the LCD for
          comparison.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The key concept is <strong>the I2C protocol</strong>: a two-wire,
          multi-device bus where the master sends a 7-bit device address before
          every transaction, allowing multiple peripherals to share the same two
          lines (SDA and SCL). Writing to EEPROM requires understanding page
          boundaries, write timing delays, and the ACK/NACK handshake, while
          reading requires a repeated-start condition to switch from write mode
          (sending the address) to read mode (clocking back data). These
          patterns appear across nearly every I2C sensor and memory device in
          embedded development.
        </p>
        <div className='flex flex-wrap gap-4 items-end justify-center w-full lg:px-40'>
          <GridImg
            src={`${BASE}/stm32_timeKeepingChart.png`}
            alt='Data flow diagram for the RTC time keeping system with EEPROM storage'
            label='System Data Flow'
          />
        </div>
      </section>
    </div>
  );
}
