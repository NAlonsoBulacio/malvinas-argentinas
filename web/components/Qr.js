export function QrCode({ size = 128 }) {
  const layers = [
    { src: "/figma/qr-0.svg", x: 0, y: 0, w: 128, h: 128 },
    { src: "/figma/qr-1.svg", x: 2.78, y: 2.78, w: 122.435, h: 122.435 },
    { src: "/figma/qr-2.svg", x: 2.78, y: 2.78, w: 34.282, h: 34.282 },
    { src: "/figma/qr-3.svg", x: 12.58, y: 12.58, w: 14.692, h: 14.692 },
    { src: "/figma/qr-4.svg", x: 90.94, y: 2.78, w: 34.282, h: 34.282 },
    { src: "/figma/qr-5.svg", x: 100.73, y: 12.58, w: 14.692, h: 14.692 },
    { src: "/figma/qr-6.svg", x: 2.78, y: 90.94, w: 34.282, h: 34.282 },
    { src: "/figma/qr-7.svg", x: 12.58, y: 100.73, w: 14.692, h: 14.692 },
  ];
  const k = size / 128;
  return (
    <div className="qr" style={{ width: size, height: size }} aria-hidden="true">
      {layers.map((l) => (
        <img
          key={l.src}
          src={l.src}
          alt=""
          style={{ left: l.x * k, top: l.y * k, width: l.w * k, height: l.h * k }}
        />
      ))}
    </div>
  );
}
