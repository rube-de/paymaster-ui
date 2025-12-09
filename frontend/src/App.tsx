import { useState } from 'react';
import svgPaths from "./imports/svg-tho7mppomn";
import imgEllipse12 from "./assets/06bb8a24578769ad41de3ffc60fcb9900be91c8d.png";

function WalletButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[8px] h-[48px] items-center p-[12px] right-[40px] rounded-[12px] top-[24px] hover:bg-[rgba(255,255,255,0.15)] transition-colors"
    >
      <div className="relative shrink-0 size-[24px]">
        <img alt="" className="block max-w-none size-full rounded-full" height="24" src={imgEllipse12} width="24" />
      </div>
      <p className="font-medium leading-[20px] relative shrink-0 text-nowrap text-white whitespace-pre">oasis1...kf9pd</p>
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="Frame 2">
            <path
              d="M8 10L12 14L16 10"
              id="Rectangle 5"
              stroke="white"
              strokeWidth="1.5"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transformOrigin: 'center', transition: 'transform 0.2s' }}
            />
          </g>
        </svg>
      </div>
    </button>
  );
}

function TicketDecoration({ color, rotation, position }: { color: string; rotation: string; position: string }) {
  return (
    <div className={`absolute ${position}`} style={{ transform: `rotate(${rotation})` }}>
      <svg className="block" width="160" height="80" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
        <g filter={`url(#noise-${color})`}>
          <path d={svgPaths.p3416cc80} fill={color} />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="80" id={`noise-${color}`} width="160" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feTurbulence baseFrequency="4 4" numOctaves="3" result="noise" seed="4641" stitchTiles="stitch" type="fractalNoise" />
            <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA type="discrete" />
            </feComponentTransfer>
            <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
            <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
            <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
            <feMerge result="effect1_noise">
              <feMergeNode in="shape" />
              <feMergeNode in="color1" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[46px] text-neutral-800 font-['IBM_Plex_Mono',monospace]">250</p>
    </div>
  );
}

function TicketsHeader() {
  const tickets = [
    { color: '#FFF47E', rotation: '0deg', position: 'left-[5%] top-[10%]' },
    { color: '#71E1E2', rotation: '346deg', position: 'left-[15%] top-[15%]' },
    { color: '#FF8EE6', rotation: '14deg', position: 'left-[25%] top-[5%]' },
    { color: '#FFF47E', rotation: '330deg', position: 'left-[35%] top-[18%]' },
    { color: '#71E1E2', rotation: '10deg', position: 'left-[45%] top-[8%]' },
    { color: '#FF8EE6', rotation: '343deg', position: 'left-[55%] top-[12%]' },
    { color: 'white', rotation: '15deg', position: 'left-[65%] top-[6%]' },
    { color: '#FFF47E', rotation: '338deg', position: 'left-[75%] top-[16%]' },
    { color: '#71E1E2', rotation: '13deg', position: 'left-[85%] top-[9%]' },
    { color: 'white', rotation: '347deg', position: 'left-[95%] top-[14%]' },
  ];

  return (
    <div className="absolute h-[240px] left-1/2 overflow-hidden top-0 -translate-x-1/2 w-[910px] pointer-events-none">
      {tickets.map((ticket, i) => (
        <TicketDecoration key={i} {...ticket} />
      ))}
    </div>
  );
}

export function App() {
  const [ticketAmount, setTicketAmount] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState(0);

  const ticketOptions = [1,2,3,4,5,6,7,8,9,10].map(v => (
    { value: v, label: v + ' ticket', price: v*250 +' ROSE' }
  ));

  const handleBuyTickets = () => {
    setPurchasedTickets(prev => prev + ticketAmount);
    setShowSuccess(true);
  };

  const handleBuyMore = () => {
    setShowSuccess(false);
  };

  const shareOnLinkedIn = () => {
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href), '_blank');
  };

  const shareOnX = () => {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('I just entered the Oasis X-mas Raffle!'), '_blank');
  };

  return (
    <div
      className="relative size-full min-h-screen font-['Geist',Helvetica]"
      style={{
        backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1440 1024\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(4.4087e-15 51.2 -72 3.1351e-15 720 512)\\'><stop stop-color=\\'rgba(25,50,60,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(10,29,36,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')"
      }}
    >
      {/* Footer Links */}
      <div className="absolute bottom-[24px] content-stretch flex font-normal gap-[16px] items-start leading-[20px] left-1/2 text-[14px] text-center text-nowrap text-white -translate-x-1/2 whitespace-pre">
        <a href="#bridge" className="[text-underline-position:from-font] decoration-solid relative shrink-0 underline hover:opacity-80 transition-opacity">How to Bridge ROSE to Sapphire</a>
        <p className="relative shrink-0">&middot;</p>
        <a href="#rules" className="[text-underline-position:from-font] decoration-solid relative shrink-0 underline hover:opacity-80 transition-opacity">Rules</a>
      </div>

      {/* Logo */}
      <div className="absolute h-[48px] left-[40px] top-[24px] w-[131px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131 48">
          <g id="Union">
            <path clipRule="evenodd" d={svgPaths.p1f562c00} fill="white" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2b736500} fill="white" fillRule="evenodd" />
            <path d={svgPaths.p1bd1ab00} fill="white" />
            <path d={svgPaths.p2a757eb0} fill="white" />
            <path clipRule="evenodd" d={svgPaths.p3d36a900} fill="white" fillRule="evenodd" />
            <path d={svgPaths.p19eb9c00} fill="white" />
          </g>
        </svg>
      </div>

      {/* Wallet */}
      <WalletButton />

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute content-stretch flex flex-col items-center right-[40px] top-1/2 -translate-y-1/2 w-[520px] animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="content-stretch flex flex-col gap-[40px] items-center w-full bg-[rgba(0,0,0,0.3)] backdrop-blur-md p-8 rounded-2xl border border-white/10">
            <div className="content-stretch flex flex-col gap-[32px] items-center w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-center text-center w-full">
                <p className="font-['Mountains_of_Christmas',cursive] leading-[normal] text-[48px] text-white">Participation Successful!</p>
                <p className="font-normal leading-[20px] text-[16px] text-[rgba(255,255,255,0.6)]">Thank you for participating in the Oasis Raffle! Good luck!</p>
              </div>
              <button
                onClick={handleBuyMore}
                className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] transition-colors content-stretch flex h-[64px] items-center justify-center px-[16px] py-[8px] rounded-[12px] w-[400px]"
              >
                <p className="font-medium leading-[20px] text-[16px] text-nowrap text-white whitespace-pre">Buy more tickets</p>
              </button>
            </div>

            <div className="content-stretch flex flex-col gap-[24px] items-center w-full">
              <p className="font-normal leading-[20px] text-[16px] text-[rgba(255,255,255,0.6)] text-center">Share on social media</p>
              <div className="content-stretch flex flex-col gap-[24px] items-start">
                <button
                  onClick={shareOnLinkedIn}
                  className="bg-white hover:bg-gray-100 transition-colors content-stretch flex h-[48px] items-center justify-between pl-[16px] pr-[8px] py-[8px] rounded-[12px] w-[400px]"
                >
                  <div className="relative shrink-0 size-[24px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g>
                        <path d={svgPaths.p2ccee40} fill="#18181B" />
                      </g>
                    </svg>
                  </div>
                  <p className="font-medium leading-[20px] text-[16px] text-black text-center text-nowrap whitespace-pre">LinkedIn</p>
                  <div className="shrink-0 size-[24px]" />
                </button>
                <button
                  onClick={shareOnX}
                  className="bg-white hover:bg-gray-100 transition-colors content-stretch flex h-[48px] items-center justify-between pl-[16px] pr-[8px] py-[8px] rounded-[12px] w-[400px]"
                >
                  <div className="relative shrink-0 size-[24px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g>
                        <path d={svgPaths.p38a22b70} fill="#18181B" />
                      </g>
                    </svg>
                  </div>
                  <p className="font-medium leading-[20px] text-[16px] text-black text-center text-nowrap whitespace-pre">X</p>
                  <div className="shrink-0 size-[24px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Decorations */}
      <TicketsHeader />

      {/* Main Content */}
      <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[520px] top-1/2 -translate-y-1/2 w-[400px]">
        <div className="content-stretch flex flex-col gap-[32px] items-center w-full">
          <div className="content-stretch flex flex-col gap-[16px] items-center text-center w-full">
            <p className="font-['Mountains_of_Christmas',cursive] leading-[64px] text-[56px] text-white w-full">X-mas Roffle</p>
            <p className="font-normal leading-[20px] text-[16px] text-[rgba(255,255,255,0.6)] w-full">Participate in the Oasis Raffle! The initial pot is 100,000 ROSE and grows with each ticket purchased which costs 250 ROSE.</p>
          </div>

          <div className="content-stretch flex flex-col gap-[24px] items-start w-[400px]">
            <div className="content-stretch flex flex-col gap-[16px] items-start w-full">
              {/* Amount Selector */}
              <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
                <div className="content-stretch flex gap-[4px] items-start leading-[20px] text-[14px] text-nowrap text-white whitespace-pre">
                  <p className="font-medium relative shrink-0">Amount</p>
                  <p className="font-normal opacity-60 relative shrink-0">(max 10 tickets per account)</p>
                </div>
                <div className="relative w-full">
                  <select
                    value={ticketAmount}
                    onChange={(e) => setTicketAmount(Number(e.target.value))}
                    className="bg-[rgba(0,0,0,0.2)] border border-black h-[48px] rounded-[12px] w-full px-[16px] py-[12px] text-white appearance-none cursor-pointer hover:bg-[rgba(0,0,0,0.3)] transition-colors"
                  >
                    {ticketOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#1a3c47] text-white">
                        {option.label} ({option.price})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M8 10L12 14L16 10" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
                <p className="font-medium leading-[20px] text-[14px] text-nowrap text-white whitespace-pre">Pay in</p>
                <div className="bg-[rgba(0,0,0,0.2)] border border-black h-[48px] rounded-[12px] w-full">
                  <div className="flex flex-row items-center size-full px-[12px]">
                    <div className="content-stretch flex gap-[8px] items-center">
                      <div className="relative shrink-0 size-[24px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                          <g opacity="0.5">
                            <path d={svgPaths.p35bbc080} fill="white" />
                          </g>
                        </svg>
                      </div>
                      <p className="font-medium leading-[20px] text-[16px] text-nowrap text-white whitespace-pre">ROSE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleBuyTickets}
              className="bg-white hover:bg-gray-100 transition-colors content-stretch flex h-[64px] items-center justify-center pl-[16px] pr-[8px] py-[8px] rounded-[12px] w-[400px]"
            >
              <p className="font-medium leading-[20px] text-[16px] text-black text-nowrap whitespace-pre">
                Buy {ticketAmount} Ticket{ticketAmount > 1 ? 's' : ''} for {ticketAmount * 250} ROSE
              </p>
            </button>
          </div>
        </div>

        <p className="font-normal leading-[18px] opacity-60 text-[12px] text-center text-white w-full">
          <span>{`By participating you agree to our `}</span>
          <a href="#terms" className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline hover:opacity-80 transition-opacity">Terms and Conditions</a>.
        </p>
      </div>

      {/* Stats */}
      <div className="absolute content-stretch flex gap-[16px] items-center left-[40px] top-[844px] w-[1360px]">
        <div className="basis-0 bg-[rgba(0,0,0,0.15)] grow min-h-px min-w-px rounded-[12px]">
          <div className="content-stretch flex flex-col items-start px-[40px] py-[20px] text-center w-full">
            <p className="font-light leading-[20px] text-[14px] text-[rgba(255,255,255,0.6)] w-full">Days to go</p>
            <p className="font-['Mountains_of_Christmas',cursive] leading-[56px] text-[48px] text-white w-full">6</p>
          </div>
        </div>
        <div className="basis-0 bg-[rgba(0,0,0,0.15)] grow min-h-px min-w-px rounded-[12px]">
          <div className="content-stretch flex flex-col items-start px-[40px] py-[20px] text-center w-full">
            <p className="font-light leading-[20px] text-[14px] text-[rgba(255,255,255,0.6)] w-full">Tickets left</p>
            <p className="font-['Mountains_of_Christmas',cursive] leading-[56px] text-[48px] text-white w-full">{2354 - purchasedTickets}</p>
          </div>
        </div>
        <div className="basis-0 bg-[rgba(0,0,0,0.15)] grow min-h-px min-w-px rounded-[12px]">
          <div className="content-stretch flex flex-col items-start px-[40px] py-[20px] text-center w-full">
            <p className="font-light leading-[20px] text-[14px] text-[rgba(255,255,255,0.6)] w-full">Pot size</p>
            <p className="font-['Mountains_of_Christmas',cursive] leading-[56px] text-[48px] text-white w-full">{(1024020 + (purchasedTickets * 250)).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
