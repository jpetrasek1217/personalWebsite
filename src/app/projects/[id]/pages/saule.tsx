import { BulletList, GridImg, ProjectTable, SectionImg } from '@/components/projects/PageBlocks';

const BASE = '/assets/saule';

const OVERVIEW: string[][] = [
  ['Product', 'Saule, a health tech platform for streamlining any mental health professional\'s workflow'],
  ['Users', 'Mental health professionals: therapists, counsellors, and psychiatrists'],
  ['Role', 'UI/UX Engineer; designed all workflows in Figma, assisted with component development for the company website and app'],
  ['Timeline', '4 months'],
];

export default function Saule() {
  return (
    <div className='space-y-12'>
      {/* Overview */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Overview</h2>
        <ProjectTable headers={['', '']} rows={OVERVIEW} />
      </section>

      {/* Challenge */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>The Challenge</h2>
        <p className='font-body text-body leading-relaxed'>
          Mental health practitioners typically rely on up to{' '}
          <strong>7 separate tools</strong> to run their practice: scheduling,
          billing, documentation, client intake, treatment planning, progress
          notes, and confidentiality paperwork. Each tool has its own interface,
          login, and learning curve. Saule set out to consolidate all of that
          into a single, coherent application without making practitioners feel
          overwhelmed by the resulting complexity.
        </p>
      </section>

      {/* Process */}
      <section className='space-y-6'>
        <h2 className='font-header font-black text-h2'>Process</h2>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Research</h3>
          <p className='font-body text-body leading-relaxed'>
            Competitor brand guidelines and widely adopted design systems,
            including Material Design, were audited to establish a design
            language that would feel familiar and professional to a clinical
            audience. The goal was to avoid re-teaching practitioners how to use
            a screen while still delivering a product that felt purpose-built for
            their context.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>User Journeys</h3>
          <p className='font-body text-body leading-relaxed'>
            Practitioner workflows were mapped as a tree structure. The home
            screen presents a small number of clear entry points; each choice
            branches into sub-features rather than presenting everything at once.
            The result is that every individual decision a practitioner makes is
            a small one, and the interface never exposes the full breadth of the
            app in a single view. Users can reach any feature in a few deliberate
            taps without feeling lost.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Information Architecture
          </h3>
          <p className='font-body text-body leading-relaxed'>
            IA research drew from apps like Jane (the leading clinic management
            platform) and Facebook, particularly how Facebook organises its
            communities and groups. Facebook was a key reference because it
            separates high-traffic, collaborative surfaces (feeds, groups,
            community pages) from quieter administrative paths (settings, account
            management, privacy controls). These represent two fundamentally
            different modes of thought within the same product.
          </p>
          <p className='font-body text-body leading-relaxed'>
            Saule mirrors that split. Client and clinician-facing workflows
            (scheduling, session notes, treatment plans, messaging) follow an
            outward-branching structure because those tasks are dynamic and
            involve back-and-forth between practitioner and client. Independent
            features like settings, billing configuration, and compliance
            documentation follow a contained, step-by-step path because they
            have a clear start and end with no collaboration required. The result
            is a navigation model where complexity stays hidden until the
            practitioner needs it, and every feature lives exactly where they
            would expect to find it.
          </p>
          <SectionImg
            src={`${BASE}/saule_communities.png`}
            alt='ADHD Community social feed in the Saule app, showing the Facebook-inspired community structure'
          />
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Wireframing</h3>
          <p className='font-body text-body leading-relaxed'>
            Full low- and mid-fidelity wireframes were built in Figma for both
            mobile and desktop breakpoints, covering all major features across
            the 700+ frame prototype. Wireframing at both resolutions early
            ensured that the information hierarchy worked before visual design
            decisions were locked in.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>Prototyping</h3>
          <p className='font-body text-body leading-relaxed'>
            A high-fidelity interactive prototype was built at desktop resolution
            to demonstrate the realistic feel of the app for investor
            presentations and stakeholder demos. The prototype covered all major
            user flows end-to-end so that investors could experience the product
            rather than just look at static screens.
          </p>
        </div>

        <div className='space-y-3'>
          <h3 className='font-header font-black text-h3'>
            Developer Collaboration
          </h3>
          <p className='font-body text-body leading-relaxed'>
            Several front-end components were designed and built for the company
            websites (
            <a
              href='https://aversa.ca'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:text-accent transition-colors'>
              aversa.ca
            </a>{' '}
            and{' '}
            <a
              href='https://www.joinsaule.com'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:text-accent transition-colors'>
              joinsaule.com
            </a>
            ) alongside the app design work. This bridged the design-to-development
            handoff directly and gave Aversa production-ready code for their web
            presence while the app prototype was being built.
          </p>
        </div>
      </section>

      {/* Key Design Decisions */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Key Design Decisions</h2>
        <BulletList
          items={[
            'Feature consolidation without overwhelm: Progressive disclosure hides secondary features behind one deliberate tap, keeping every primary view to 3-5 actions maximum so the practitioner is never paralysed by choice.',
            'Unified visual identity across 10+ features: A consistent component library (colour, typography, spacing, iconography) ensures that the billing flow and the session notes flow feel like the same product rather than different tools bolted together.',
            'In-app payments: The payments flow mirrors consumer checkout expectations (clear summary, secure input, confirmation) while surfacing only the fields clinically relevant to a therapy practice.',
            'Confidentiality and paperwork: Consent and documentation flows are designed to be fast and self-guiding. Clients and practitioners complete required paperwork through a guided step sequence in the app, with audit trail creation handled automatically in the background.',
          ]}
        />
      </section>

      {/* Key Design Decisions Screenshots */}
      <section className='space-y-4'>
        <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
          <GridImg
            src={`${BASE}/saule_scheduling.png`}
            alt='Scheduling request form with clock-wheel time picker'
            label='Scheduling Request'
          />
          <GridImg
            src={`${BASE}/saule_journaling.png`}
            alt='Client journal entry view'
            label='Client Journal'
          />
          <GridImg
            src={`${BASE}/saule_bulletein.png`}
            alt='Referrals client list with clinicians and clients tabs'
            label='Referrals'
          />
        </div>
        <div className='flex flex-wrap gap-4 items-start justify-center w-full'>
          <GridImg
            src={`${BASE}/saule_resources.png`}
            alt='Resources hub with grid of resource types including journals, clinicians, hotlines, and peer groups'
            label='Resources Hub'
          />
          <GridImg
            src={`${BASE}/saule_referrals.png`}
            alt='Referral notifications with accept and decline actions'
            label='Referral Notifications'
          />
        </div>
      </section>

      {/* Impact */}
      <section className='space-y-4'>
        <h2 className='font-header font-black text-h2'>Impact</h2>
        <BulletList
          items={[
            'Delivered a fully wired, 700+ frame prototype covering all major workflows, giving the company a complete developer handoff reference for any engineers hired after the engagement.',
            '300% increase in product wishlists following the prototype launch.',
            'Prototype used directly in investor demos to communicate product vision and demonstrate UX quality.',
          ]}
        />
      </section>

      {/* NDA Note */}
      <section className='space-y-2'>
        <p className='font-body text-body leading-relaxed italic text-dark/60'>
          Due to confidentiality agreements with Aversa, detailed design
          artifacts, wireframes, and workflow diagrams cannot be publicly
          displayed. This case study describes the design process, decisions, and
          outcomes without reproducing proprietary materials.
        </p>
      </section>
    </div>
  );
}
