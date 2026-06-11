import {
  BulletList,
  GridImg,
  NaturalImg,
  ProjectTable,
} from '@/components/projects/PageBlocks';

const BASE = '/assets/pacemakerGUI';

const PROGRAMMABLE_PARAMS: string[][] = [
  ['Lower / Upper Rate Limit', 'BPM', 'Minimum and maximum pacing rate'],
  ['Atrial Amplitude', 'V', 'Pulse voltage delivered to atrium'],
  ['Atrial Pulse Width', 'ms', 'Duration of atrial pulse'],
  ['Atrial Sensitivity (ARP)', 'ms', 'Atrial refractory period'],
  ['Ventricular Amplitude', 'V', 'Pulse voltage delivered to ventricle'],
  ['Ventricular Pulse Width', 'ms', 'Duration of ventricular pulse'],
  ['Ventricular Sensitivity (VRP)', 'ms', 'Ventricular refractory period'],
  ['Max Sensor Rate', 'BPM', 'Upper limit when rate-adaptive mode is active'],
  ['Reaction Time', 'sec', 'Time to increase rate in response to activity'],
  ['Response Factor', 'N/A', 'Sensitivity of rate increase to activity'],
  ['Recovery Time', 'min', 'Time to return to lower rate after activity'],
  ['Threshold', 'N/A', 'Activity level required to trigger rate adaptation'],
];

const PACING_MODES: string[][] = [
  ['AOO', 'Atrial', 'No', 'Asynchronous atrial pacing'],
  ['AAI', 'Atrial', 'No', 'Inhibited atrial pacing'],
  ['VOO', 'Ventricular', 'No', 'Asynchronous ventricular pacing'],
  ['VVI', 'Ventricular', 'No', 'Inhibited ventricular pacing'],
  ['AOOR', 'Atrial', 'Yes', 'Rate-adaptive asynchronous atrial'],
  ['AAIR', 'Atrial', 'Yes', 'Rate-adaptive inhibited atrial'],
  ['VOOR', 'Ventricular', 'Yes', 'Rate-adaptive asynchronous ventricular'],
  ['VVIR', 'Ventricular', 'Yes', 'Rate-adaptive inhibited ventricular'],
];

const SERIAL_PACKET: string[][] = [
  ['SYNC_CODE', '22 (constant)', 'Marks the start of every packet'],
  [
    'FN_CODE',
    '85 = parameters, 34 = e-gram request',
    'Tells pacemaker how to interpret the payload',
  ],
  ['PACING_MODE', '0–7 (AOO=0, VOO=1, …)', 'Integer encoding of selected mode'],
  [
    'Parameters',
    '13 doubles (8 bytes each)',
    'Little-endian, agreed order between DCM and board',
  ],
  ['CHECKSUM', 'Σ(i × xᵢ)', 'Index-weighted sum: verifies data and order'],
];

const TEST_LOGIN: string[][] = [
  ['Create new user', 'username=New, password=Pass', 'Success', 'Pass'],
  [
    'Duplicate username',
    'username=admin (existing)',
    'Username Already Taken Error',
    'Pass',
  ],
  [
    'Invalid username chars',
    'username=NewU$er',
    'Invalid Username Error',
    'Pass',
  ],
  ['Invalid password chars', 'password=P@ss', 'Invalid Password Error', 'Pass'],
  [
    'Unregistered user login',
    'username=Unknown',
    'Incorrect Credentials Error',
    'Pass',
  ],
  [
    'Wrong password for existing user',
    'username=admin, password=Pass',
    'Incorrect Credentials Error',
    'Pass',
  ],
  [
    'Correct credentials',
    'username=admin, password=3K04',
    'Successful Login',
    'Pass',
  ],
];

const TEST_PARAMS: string[][] = [
  ['Nominal value', 'Input = 60.0', 'Acceptable', 'Pass'],
  ['Within valid range', 'Input = 75.0', 'Acceptable', 'Pass'],
  ['Above upper limit', 'Input = 300.0', 'Out of Range Error', 'Pass'],
  ['Below lower limit', 'Input = 5.0', 'Out of Range Error', 'Pass'],
  [
    'Floating point, many decimals',
    'Input = 56.12345',
    'Acceptable, rounds to 56.0',
    'Pass',
  ],
  ['Non-numeric input', 'Input = "Sixty"', 'Non-Numeric Input Error', 'Pass'],
];

const TEST_CONNECTION: string[][] = [
  ['No pacemaker connected', 'None', 'Unable to Find Pacemaker Error', 'Pass'],
  [
    'Pacemaker connected via USB',
    'USB connected, Link pressed',
    'Successful Connection',
    'Pass',
  ],
  [
    'Pacemaker disconnected mid-session',
    'Unplug after linking',
    'Disconnected Popup shown',
    'Pass',
  ],
  [
    'Two pacemakers (initial attempt)',
    'Two USB boards connected',
    'Two Pacemakers Connected Error',
    'Fail → Fixed',
  ],
  [
    'Two pacemakers (after fix)',
    'Two USB boards connected',
    'Two Pacemakers Connected Error',
    'Pass',
  ],
];

export default function PacemakerGui() {
  return (
    <div className='space-y-12'>
      {/* Project Overview */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Project Overview</h2>
        <p className='font-body text-body leading-relaxed'>
          The DCM (Device Controller-Monitor) is a{' '}
          <strong>Python desktop application</strong> that serves as the user
          interface for a simulated programmable pacemaker. Developed at
          McMaster University with co-author <strong>Nathan Marttunen</strong>,
          the DCM lets medical users view and modify pacemaker parameters,
          select pacing modes, and request electrocardiogram data, all
          communicated over USB serial to a pacemaker simulation board.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The project emphasizes software architecture and reliable engineering:
          clean module separation, strict parameter validation, a well-defined
          serial protocol with checksums, and rigorous acceptance testing
          against all requirement categories.
        </p>
      </section>

      {/* Engineering Requirements */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>
          Engineering Requirements
        </h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            User & Session Management
          </h3>
          <BulletList
            items={[
              'Welcome screen prompts for username and password on launch',
              'Users can register new accounts or log into existing ones',
              'Maximum of 10 user profiles stored locally at once',
              'Logging out returns to the welcome screen without closing the application',
              "Each user's pacing mode and all parameter values persist between sessions",
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Programmable Parameters
          </h3>
          <p className='font-body text-body leading-relaxed'>
            All 12 programmable parameters must be displayed with their current
            value, unit of measurement, and be editable by the user. Parameters
            that are not applicable to the selected pacing mode are hidden:
          </p>
          <ProjectTable
            headers={['Parameter', 'Unit', 'Description']}
            rows={PROGRAMMABLE_PARAMS}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Pacing Modes</h3>
          <ProjectTable
            headers={['Mode', 'Chamber', 'Rate Adaptive', 'Description']}
            rows={PACING_MODES}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Pacemaker Communication
          </h3>
          <BulletList
            items={[
              'A serial comms screen allows the user to link the DCM to the pacemaker board via USB',
              'Once linked, saved parameters and the active pacing mode can be sent to the pacemaker',
              'A checksum on transmission must pass before the pacemaker confirms success',
              'E-gram (electrocardiogram) data can be requested and displayed: 2 seconds of atrial and ventricular voltage',
              'The pacemaker connection status is continuously monitored; a popup notifies the user if the board disconnects',
            ]}
          />
        </div>
      </section>

      {/* Software Design Decisions */}
      <section className='space-y-8'>
        <h2 className='font-header font-black text-h2'>
          Software Design Decisions
        </h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Technology Stack</h3>
          <p className='font-body text-body leading-relaxed'>
            <strong>Python</strong> was chosen as the development language for
            its high-level abstractions, extensive standard library, and
            documentation, reducing implementation time without sacrificing
            capability. Three libraries drive the core functionality:
          </p>
          <BulletList
            items={[
              "Tkinter: Python's built-in GUI toolkit. Highly adaptable and well-documented; no additional installation needed",
              'JSON (stdlib): user data persists as a local JSON file. JSON converts directly to Python dictionaries, keeping serialization code minimal',
              'PySerial: abstracts the details of USB serial communication; aids hardware hiding by containing all port logic in one module',
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Parameter Data Type
          </h3>
          <p className='font-body text-body leading-relaxed'>
            All parameter values are stored as <strong>doubles</strong>. The
            pacemaker Simulink model requires precise values; ints or floats
            would introduce rounding errors or necessitate explicit conversion
            code on the board side. While doubles use more memory than floats,
            the Simulink model does not have memory constraints that make this a
            concern, and the precision benefit outweighs the storage cost.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            User Interface Layout
          </h3>
          <BulletList
            items={[
              'Welcome screen: username and password fields placed in conventional order (username above password), login and register buttons below, familiarity minimizes cognitive load for medical users',
              'Parameter display: grid layout makes efficient use of the square window and makes it easy to see atrial/ventricular parameter pairs side-by-side',
              'New user defaults: all parameters initialize to nominal (clinical reference) values, so users have a meaningful starting point rather than zeros',
              'Pacing mode selector: grid layout co-located with the save button for spatial efficiency; active mode shown in the top-left with larger font weight to make mode changes immediately obvious',
              'Parameter labels include units (BPM, ms, V), so users always know what value they are entering, reducing input errors',
              'Out-of-range inputs show an error message listing the exact acceptable range, so users can correct without guessing',
            ]}
          />
          <div className='flex flex-wrap md:grid md:grid-cols-2 gap-4 items-end justify-center lg:px-20'>
            <GridImg
              src={`${BASE}/pacemaker_welcome.webp`}
              alt='Welcome Screen'
              label='Welcome'
            />
            <GridImg
              src={`${BASE}/pacemaker_main.webp`}
              alt='Main GUI'
              label='Main GUI'
            />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Module Architecture
          </h3>
          <p className='font-body text-body leading-relaxed'>
            The DCM is split across multiple Python files, each with a distinct
            responsibility. This was a deliberate choice to support parallel
            development between two authors and keep each module independently
            testable:
          </p>
          <BulletList
            items={[
              'GUI files represent individual screens (Welcome, DCM, E-gram): each file owns its own layout and event handling',
              'Global Variables file holds shared state (active user, Tkinter frames) that all screens need; without it, no module could coordinate frame transitions',
              'User Manager is the single interface between the GUI and all backend operations (login, register, save parameters, communicate with pacemaker); GUI modules never touch the data layer directly',
              'Error handling is centralised at the User Manager interface: backend modules raise errors; the User Manager catches and returns descriptive messages; the GUI displays them, a clean separation of concerns',
              'Serial Communications module encapsulates all port logic; hardware hiding means switching from USB to another transport would only require changes in one file',
            ]}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Serial Communication Protocol
          </h3>
          <p className='font-body text-body leading-relaxed'>
            The DCM and pacemaker board communicate over USB at{' '}
            <strong>115200 baud, 8-N-1</strong>. Every packet is exactly{' '}
            <strong>152 bytes</strong> (padded with zeros if shorter). The fixed
            size was agreed upon between the DCM and the Simulink model to
            simplify framing, so neither side needs to read until a delimiter.
          </p>
          <ProjectTable
            headers={['Field', 'Value', 'Purpose']}
            rows={SERIAL_PACKET}
          />
          <p className='font-body text-body leading-relaxed'>
            The checksum is an index-weighted linear combination of all
            parameter values: <strong>checksum = Σ(i × xᵢ)</strong>. Weighting
            by index is intentional: a simple sum would not detect if two values
            swapped positions in the packet, but the weighted sum produces a
            different result if the order changes. This verifies both integrity
            and ordering with a single value.
          </p>
          <p className='font-body text-body leading-relaxed'>
            For E-gram requests, the DCM sends only a sync code and function
            code (34). The pacemaker responds with{' '}
            <strong>2 seconds of atrial and ventricular voltage data</strong>.
            Two seconds was chosen because at the minimum pacing rate of 30 BPM,
            a complete pulse cycle occurs every 2 seconds, guaranteeing at least
            one pulse is captured in every request.
          </p>
          <div className='flex justify-center lg:px-40'>
            <GridImg
              src={`${BASE}/pacemaker_serial.webp`}
              alt='Serial Link'
              label='Serial Link'
            />
          </div>
        </div>
      </section>

      {/* Validation Through Testing */}
      <section className='space-y-8'>
        <h2 className='font-header font-black text-h2'>
          Validation Through Testing
        </h2>
        <p className='font-body text-body leading-relaxed'>
          Testing was staged: individual functions first, then module-level
          tests, then integration tests covering end-to-end workflows. Three
          areas received the most rigorous coverage, as they are the most open
          to user error or unexpected hardware state.
        </p>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Login & Registration
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Credentials are open to any keyboard input, so the validation logic
            (alphanumeric characters only, non-empty, 10-user limit) needed to
            cover a wide range of adversarial inputs:
          </p>
          <ProjectTable
            headers={['Test', 'Input', 'Expected', 'Result']}
            rows={TEST_LOGIN}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Parameter Saving</h3>
          <p className='font-body text-body leading-relaxed'>
            Test cases were created for every parameter. The example below uses
            Lower Rate Limit (nominal 60 BPM, range 30–175 BPM, rounded to
            nearest integer):
          </p>
          <ProjectTable
            headers={['Test', 'Input', 'Expected', 'Result']}
            rows={TEST_PARAMS}
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Pacemaker Connection Status
          </h3>
          <p className='font-body text-body leading-relaxed'>
            The connection monitor must handle boards being plugged in,
            unplugged mid-session, and a scenario discovered during testing,
            multiple boards connected simultaneously:
          </p>
          <ProjectTable
            headers={['Test', 'Input', 'Expected', 'Result']}
            rows={TEST_CONNECTION}
          />
          <p className='font-body text-body leading-relaxed'>
            The two-pacemaker case initially passed without raising an error,
            causing an ambiguous connection state. After the first test failure,
            the{' '}
            <code className='font-mono bg-dark/5 px-1 rounded'>
              _onlyOnePacemakerConnected()
            </code>{' '}
            check was added to the Serial Communications module, which counts
            matching comm ports and blocks connection if more than one is found.
          </p>
        </div>
      </section>
    </div>
  );
}
