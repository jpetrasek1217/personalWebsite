import {
  BulletList,
  CodeBlock,
  ProjectTable,
  SectionImg,
  VideoEmbed,
} from '@/components/projects/PageBlocks';

const BASE = '/assets/7SD';

const DIGIT_SEQUENCE: string[][] = [
  ['4', '1st', '0', '0100', '00100'],
  ['0', '1st', '0', '0000', '00000'],
  ['0', '2nd', '1', '0000', '10000'],
  ['3', 'only', '0', '0011', '00011'],
  ['8', '1st', '0', '1000', '01000'],
  ['6', 'only', '0', '0110', '00110'],
  ['8', '2nd', '1', '1000', '11000'],
  ['1', 'only', '0', '0001', '00001'],
  ['4', '2nd', '1', '0100', '10100'],
];

const SOP_RESULTS: string[][] = [
  ['JC1', '!Q1·!Q2 + Q3', '1 AND + 1 OR = 2 gates'],
  ['!KC1', '!Q2·!Q3', '1 AND = 1 gate'],
  ['JQ1', 'Q3', '0 gates (direct wire)'],
  ['!KQ1', 'GND', 'Grounded, always 0 or X'],
  ['JQ2', '!C1·Q1 + !Q3·Q4', '2 AND + 1 OR = 3 gates'],
  ['!KQ2', 'C1', '0 gates (direct wire)'],
  ['JQ3', 'C1·!Q1·!Q2·!Q3·!Q4 + !C1·Q1', '5 AND + 1 OR = 6 gates'],
  ['!KQ3', 'GND', 'Grounded, always 0 or X'],
  ['JQ4', 'C1·!Q2', '1 AND = 1 gate'],
  ['!KQ4', 'GND', 'Grounded, always 0 or X'],
];

const KMAP_JC1: string[][] = [
  ['00', '1', 'X', 'X', 'X', '1', 'X', 'X', '0'],
  ['01', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['11', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['10', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
];

const IMPLEMENTATION_COMPARISON: string[][] = [
  [
    'SOP',
    '13 (10 AND + 3 OR)',
    '4',
    'Selected, fewest gates, low chip diversity',
  ],
  [
    'POS',
    '15 (5 OR + 5 NAND + 5 AND)',
    '4',
    'Same chip count but more gates; needs 3 gate types',
  ],
  ['NAND', '21 NAND only', '6', 'Uniform gate type but highest chip count'],
];

export default function SevenSDProject() {
  return (
    <div className='space-y-12'>
      {/* Project Overview */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Project Overview</h2>
        <p className='font-body text-body leading-relaxed'>
          This project implements a <strong>sequential logic circuit</strong>{' '}
          that cycles through a randomly generated 9-digit sequence,{' '}
          <strong>400386814</strong>, displayed on a 7-segment display driven by
          a BCD decoder chip. No microcontroller is involved: the sequence is
          produced entirely from JK flip-flops and combinational logic gates
          running off a clock signal.
        </p>
        <p className='font-body text-body leading-relaxed'>
          The logic was derived analytically using excitation tables and K-maps,
          then optimized across three implementations, Sum of Products (SOP),
          Product of Sums (POS), and NAND-only, before being simulated in{' '}
          <strong>NI Multisim</strong> and physically realized on a breadboard.
        </p>
      </section>

      {/* Deriving the Sequence */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>
          Deriving the Sequence
        </h2>
        <p className='font-body text-body leading-relaxed'>
          The sequence <strong>400386814</strong> contains 9 states with three
          repeated digits (0, 8, and 4 each appear twice). A dedicated counter
          bit <strong>C1</strong> distinguishes first and second occurrences of
          each repeated digit. Combined with 4 BCD bits (Q1–Q4) fed to the
          decoder chip, a total of <strong>5 flip-flops</strong> encode every
          state.
        </p>
        <p className='font-body text-body leading-relaxed'>
          Non-repeated digits are assigned C1=0 rather than a don&apos;t-care
          state. This decision simplifies K-mapping downstream by eliminating
          ambiguity in the excitation tables, don&apos;t-cares at C1 for those
          rows would have produced larger, harder-to-verify simplifications.
        </p>
        <ProjectTable
          headers={[
            'Digit',
            'Occurrence',
            'C1',
            'Q1Q2Q3Q4',
            'Full State (C1Q1Q2Q3Q4)',
          ]}
          rows={DIGIT_SEQUENCE}
        />
        <p className='font-body text-body leading-relaxed'>
          The resulting state cycle is:
        </p>
        <CodeBlock>
          {
            '00100 → 00000 → 10000 → 00011 → 01000 → 00110 → 11000 → 00001 → 10100 → (repeat)'
          }
        </CodeBlock>
      </section>

      {/* State Transition Analysis */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          State Transition Analysis
        </h2>
        <p className='font-body text-body leading-relaxed'>
          Using JK flip-flop excitation tables, each bit&apos;s J and !K inputs
          were determined for every state transition. Each row of the table
          records the current 5-bit state, the required next 5-bit state, and
          the excitation values (J, !K) for all five flip-flops, 10 inputs total
          across 9 rows.
        </p>
        <p className='font-body text-body leading-relaxed'>
          Before developing a single K-map, an important pattern was identified:
          the inputs to <strong>!KQ1</strong>, <strong>!KQ3</strong>, and{' '}
          <strong>!KQ4</strong> are either 0 or don&apos;t-care across all 9
          states. These three inputs can be connected directly to ground,
          resolving 30% of all flip-flop inputs before any K-mapping is done:
        </p>
        <BulletList
          items={[
            "!KQ1 → GND (all entries are 0 or don't care)",
            "!KQ3 → GND (all entries are 0 or don't care)",
            "!KQ4 → GND (all entries are 0 or don't care)",
          ]}
        />
      </section>

      {/* K-Map Derivations */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>K-Map Derivations</h2>
        <p className='font-body text-body leading-relaxed'>
          K-maps were derived for all remaining 7 inputs in both SOP and POS
          forms, 14 K-maps total. Each uses a 5-variable map with axes C1Q1 and
          Q2Q3Q4 in Gray code order. The representative example below shows the
          derivation for <strong>JC1</strong> (X = don&apos;t-care):
        </p>
        <ProjectTable
          headers={[
            'C1Q1 / Q2Q3Q4',
            '000',
            '001',
            '011',
            '010',
            '110',
            '111',
            '101',
            '100',
          ]}
          rows={KMAP_JC1}
        />
        <p className='font-body text-body'>Two prime implicant groups:</p>
        <BulletList
          items={[
            "!Q1·!Q2, spans row 00 with Q2=0 (col 000), extended into don't-care cells",
            "Q3, spans row 00 where Q3=1 (col 110), extended into don't-care cells across remaining rows",
          ]}
        />
        <p className='font-body text-body'>
          SOP result: <strong>!Q1·!Q2 + Q3</strong>
        </p>
        <p className='font-body text-body leading-relaxed'>
          This same process, plotting all 9 known states, treating unvisited
          states as don&apos;t-cares, and grouping to minimize the expression,
          was applied to all 7 remaining inputs. The complete SOP results are:
        </p>
        <ProjectTable
          headers={['Input', 'SOP Expression', 'Gate Count']}
          rows={SOP_RESULTS}
        />
      </section>

      {/* Implementation Comparison */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>
          Implementation Comparison
        </h2>
        <p className='font-body text-body leading-relaxed'>
          Each SOP expression was also derived in POS form and converted to
          NAND-only logic. The three implementations were evaluated before
          committing to Multisim construction:
        </p>
        <ProjectTable
          headers={['Design', 'Gate Count', 'Chip Count', 'Notes']}
          rows={IMPLEMENTATION_COMPARISON}
        />
        <p className='font-body text-body leading-relaxed'>
          SOP was selected for two reasons. First, it requires the fewest total
          gates (13 vs 15 vs 21). Second, only two chip types are needed, AND
          and OR, compared to POS which requires AND, OR, and NAND chips. The
          NAND-only form uses only one gate type but needs 50% more chips than
          either algebraic form, which offers no practical advantage.
        </p>
      </section>

      {/* Multisim Implementation */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          Multisim Implementation
        </h2>
        <p className='font-body text-body leading-relaxed'>
          The SOP circuit was implemented in <strong>NI Multisim</strong> using
          the derived logic expressions, a BCD decoder, and a 7-segment display.
          An LED bar was added alongside the display, each LED representing one
          flip-flop output, providing a live binary readout to verify the
          circuit state at each clock edge.
        </p>
        <SectionImg
          src={`${BASE}/7SD_multisim.webp`}
          alt='Full NI Multisim implementation of the sequential logic circuit'
        />
        <p className='font-body text-body leading-relaxed'>
          This debug aid caught a critical error near the end of integration:
          the display was cycling through the correct number of states, but the
          digits were wrong. Comparing the LED binary values against the
          expected state table revealed that Q2 was never toggling high. The
          root cause was a missing wire, the JQ2 input had been left
          unconnected. After wiring JQ2 to its correct logic expression, the
          sequence matched the design exactly.
        </p>
        <p className='font-body text-body leading-relaxed'>
          With the circuit running correctly, the Multisim logic analyser
          produced a timing diagram matching the initial state transition table,
          confirming the analytical derivation was correct end-to-end.
        </p>
        <SectionImg
          src={`${BASE}/7SD_timing.webp`}
          alt='Logic analyser timing diagram matching the designed state sequence'
        />
      </section>

      {/* Physical Implementation */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>
          Physical Implementation
        </h2>
        <p className='font-body text-body leading-relaxed'>
          The validated Multisim design was transferred to a breadboard using
          discrete JK flip-flop ICs, AND/OR gate chips, and a BCD-to-7-segment
          decoder. The circuit successfully cycled through the full 9-digit
          sequence on the display.
        </p>
        <BulletList
          items={[
            '5 JK flip-flops (C1, Q1, Q2, Q3, Q4), one chip per two flip-flops',
            'AND and OR gate ICs implementing the 10 SOP logic expressions',
            'BCD-to-7SD decoder chip driven by outputs Q1–Q4',
            '7-segment display showing the live digit',
            'LED bar providing per-flip-flop binary readout for debugging',
            'External clock signal controlling transition speed',
          ]}
        />
        <VideoEmbed
          src='https://drive.google.com/file/d/1hNjaQnXR8GDDJd4A_8dA6kCJkcMrvXIL/preview'
          title='Sequential logic design: 7SD breadboard demo'
        />
      </section>
    </div>
  );
}
