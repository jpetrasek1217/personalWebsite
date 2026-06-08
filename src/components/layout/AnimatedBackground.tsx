export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute rounded-full opacity-60 will-change-transform animate-orb-1"
        style={{
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, #CEFAFF 0%, transparent 70%)',
          top: '-10%',
          left: '-15%',
        }}
      />
      <div
        className="absolute rounded-full opacity-40 will-change-transform animate-orb-2"
        style={{
          width: '80vw',
          height: '80vw',
          background: 'radial-gradient(circle, #73F2FF 0%, transparent 70%)',
          bottom: '-20%',
          right: '-20%',
        }}
      />
      <div
        className="absolute rounded-full opacity-35 will-change-transform animate-orb-4"
        style={{
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, #C0BBFF 0%, transparent 70%)',
          top: '-5%',
          right: '5%',
        }}
      />
    </div>
  );
}
