import { BulletList, CodeBlock } from '@/components/projects/PageBlocks';

export default function RoboticCarControls() {
  return (
    <div className='space-y-12'>
      {/* Project Overview */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Project Overview</h2>
        <p className='font-body text-body leading-relaxed'>
          This project was built during a 12-hour engineering competition. The
          goal was to implement wireless controls for a two-motor robot car
          equipped with a servo attachment, using two{' '}
          <strong>ESP8266 Wi-Fi microchips</strong> communicating directly with
          each other.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The result is two Arduino sketches: a <strong>transmitter</strong>{' '}
          that reads four push-buttons and broadcasts their state 20 times per
          second, and a <strong>receiver</strong> that decodes the incoming data
          and drives the motors and servo accordingly.
        </p>
      </section>

      {/* Hardware Architecture */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          Hardware Architecture
        </h2>
        <p className='font-body text-body leading-relaxed'>
          The system uses two separate ESP8266 boards flashed with different
          sketches:
        </p>
        <BulletList
          items={[
            'Transmitter board: handheld controller with 4 push-buttons (left, up/forward, right, servo trigger) wired to digital GPIO pins',
            'Receiver board: mounted on the robot car, connected to a dual H-bridge motor driver (L293D-style) controlling two DC motors and a servo motor',
            'Right motor: enable on pin 16, direction pins 2 and 0',
            'Left motor: enable on pin 14, direction pins 4 and 5',
            'Servo motor: signal pin 3',
          ]}
        />
        <p className='font-body text-body leading-relaxed'>
          Both motors run at full speed by default (enable pins held HIGH).
          Speed control was not a requirement for this competition, keeping the
          wiring and firmware simple.
        </p>
      </section>

      {/* ESP-NOW Configuration */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>
          ESP-NOW Configuration
        </h2>
        <p className='font-body text-body leading-relaxed'>
          <strong>ESP-NOW</strong> is a Espressif peer-to-peer protocol that
          runs on top of the Wi-Fi radio without needing a router or access
          point. The two boards talk directly to each other by MAC address, with
          sub-10ms latency, ideal for a real-time control application under
          time pressure.
        </p>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Why ESP-NOW over standard TCP/IP
          </h3>
          <BulletList
            items={[
              'No router required: one fewer point of failure in a competition environment',
              "Lower setup overhead: pairing is done by hardcoding the receiver's MAC address in the transmitter, a one-time lookup",
              'Lower latency: packets are sent at the radio layer, bypassing TCP/IP stack overhead',
              'Built into the ESP8266 SDK: no additional library installation under a time constraint',
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Setup sequence (both chips)
          </h3>
          <BulletList
            items={[
              'Set Wi-Fi mode to WIFI_STA (station mode): required for ESP-NOW to initialise correctly',
              'Call esp_now_init(): returns non-zero on failure, logged to serial',
              "Transmitter: set role to ESP_NOW_ROLE_CONTROLLER, register the receiver's MAC as a peer",
              'Receiver: set role to ESP_NOW_ROLE_SLAVE, register the OnDataRecv callback',
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            MAC address pairing
          </h3>
          <p className='font-body text-body leading-relaxed'>
            The receiver&apos;s MAC address is hardcoded into the transmitter
            sketch. This is the minimal viable pairing strategy: no handshake,
            no discovery. Read the MAC from the receiver&apos;s serial monitor
            on first boot and paste it in:
          </p>
          <CodeBlock>{`uint8_t broadcastAddress[] = {0x48, 0x3F, 0xDA, 0x4C, 0xA4, 0xF2};`}</CodeBlock>
        </div>
      </section>

      {/* Data Protocol */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Data Protocol</h2>
        <p className='font-body text-body leading-relaxed'>
          Both chips share an identical C struct that carries the button state
          as four integers. The struct{' '}
          <strong>must be byte-for-byte identical</strong> on both sides; a
          mismatch causes silent data corruption. The safest approach is
          copy-paste:
        </p>
        <CodeBlock>{`typedef struct struct_message {
  int d_zero;  // left button
  int d_one;   // up/forward button
  int d_two;   // right button
  int d_four;  // servo button
} struct_message;`}</CodeBlock>
        <p className='font-body text-body leading-relaxed'>
          Each field is 1 when the corresponding button is pressed, 0 when
          released. The transmitter reads all four GPIO pins and populates the
          struct every 50 ms, giving a 20 Hz control rate, responsive enough
          for manual driving with minimal radio overhead.
        </p>
      </section>

      {/* Transmitter Design */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Transmitter Design</h2>
        <p className='font-body text-body leading-relaxed'>
          The transmitter loop is intentionally minimal: poll four buttons,
          populate the struct, send. A 50 ms timer prevents flooding the
          receiver while keeping latency low.
        </p>
        <BulletList
          items={[
            'digitalRead() on all four pins each cycle',
            'esp_now_send() broadcasts the struct to the hardcoded peer address',
            'OnDataSent callback prints "Delivery success" or "Delivery fail" to the serial monitor, the primary debugging tool during the competition',
            'If delivery is consistently failing, the problem is almost certainly pin wiring or a wrong MAC address, not the protocol itself',
          ]}
        />
      </section>

      {/* Receiver & Motor Logic */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>
          Receiver & Motor Logic
        </h2>
        <p className='font-body text-body leading-relaxed'>
          The receiver decodes button combinations in{' '}
          <code className='font-mono bg-dark/5 px-1 rounded'>OnDataRecv</code>{' '}
          and calls the appropriate movement function. The control mapping was
          chosen to make simultaneous left+right mean &quot;forward&quot;,
          keeping single-direction presses available for turns:
        </p>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Button combination mapping
          </h3>
          <BulletList
            items={[
              'Left only (d_zero=1, d_two=0) → CAR_moveLeft: right motor forward only, left motor stopped',
              'Right only (d_zero=0, d_two=1) → CAR_moveRight: left motor forward only, right motor stopped',
              'Left + Right (d_zero=1, d_two=1) → CAR_moveForward: both motors forward',
              'Neither (d_zero=0, d_two=0, d_four=0) → CAR_stop: all motor pins LOW',
              'Servo button (d_four=1) → SERVO_move: toggles between 0° and 60°',
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Motor direction logic
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Each DC motor is driven by two direction pins on the H-bridge.
            Setting one HIGH and one LOW drives forward; reversing them drives
            backward; both LOW coasts to a stop. The exact HIGH/LOW mapping
            depends on how the motor wires are connected to the bridge, which is
            why the code comments explicitly note that these may need to be
            swapped by trial and error:
          </p>
          <CodeBlock>{`// May need to change pin definitions below if this doesn't
// actually move your car forward. Trial and error is simplest.
void CAR_moveForward() {
  digitalWrite(rightMotorPin1, LOW);
  digitalWrite(rightMotorPin2, HIGH);
  digitalWrite(leftMotorPin1, HIGH);
  digitalWrite(leftMotorPin2, LOW);
}`}</CodeBlock>
        </div>
      </section>

      {/* Signal Timeout Safety */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          Signal Timeout Safety
        </h2>
        <p className='font-body text-body leading-relaxed'>
          The receiver tracks when the last packet arrived. If no packet is
          received within <strong>1000 ms</strong>, it calls{' '}
          <code className='font-mono bg-dark/5 px-1 rounded'>CAR_stop()</code>,
          cutting power to both motors. This prevents the robot from running
          away if:
        </p>
        <BulletList
          items={[
            'The transmitter is powered off or out of range',
            'The ESP-NOW connection drops mid-run',
            'The competition referee stops the test unexpectedly',
          ]}
        />
        <p className='font-body text-body leading-relaxed'>
          This is a minimal safety measure that costs nothing to implement and
          eliminates an entire class of uncontrolled-robot incidents during a
          live demo.
        </p>
      </section>

      {/* Rapid Iteration & Debugging */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          Rapid Iteration & Debugging
        </h2>
        <p className='font-body text-body leading-relaxed'>
          With a 12-hour window, debugging strategy mattered as much as the
          design. Several decisions were made specifically to shorten the
          feedback loop:
        </p>
        <BulletList
          items={[
            'Serial monitor first: every key state transition (button pressed, delivery success/fail, bytes received) is logged. This lets you diagnose whether a problem is in the transmitter, the radio link, or the receiver without needing a logic analyser.',
            'Layered testing: verify the ESP-NOW link works (delivery success in serial) before wiring motors. Verify motor direction manually before integrating button logic.',
            'Trial-and-error pin mapping: motor direction depends on physical wire orientation which is unknown until the car is built. The code comments acknowledge this explicitly and the fix is a one-line swap.',
            'Struct copy-paste discipline: the shared struct_message is identical in both files by design. Any divergence causes silent bugs that are very hard to trace; copying the exact typedef eliminates this.',
            'Minimal feature set: only four controls (left, forward, right, servo). Every extra control added under time pressure is another possible failure mode.',
          ]}
        />
      </section>
    </div>
  );
}
