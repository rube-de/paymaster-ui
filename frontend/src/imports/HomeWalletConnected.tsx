import svgPaths from './svg-tho7mppomn'
import imgEllipse12 from '../assets/06bb8a24578769ad41de3ffc60fcb9900be91c8d.png'

function Frame8() {
  return (
    <div className="absolute bottom-[24px] content-stretch flex font-['Geist:Regular',sans-serif] font-normal gap-[16px] items-start leading-[20px] left-1/2 text-[14px] text-center text-nowrap text-white translate-x-[-50%] whitespace-pre">
      <p className="[text-underline-position:from-font] decoration-solid relative shrink-0 underline">
        How to Bridge ROSE to Sapphire
      </p>
      <p className="relative shrink-0">·</p>
      <p className="[text-underline-position:from-font] decoration-solid relative shrink-0 underline">
        Rules
      </p>
    </div>
  )
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame 2">
          <path d="M8 10L12 14L16 10" id="Rectangle 5" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

function Wallet() {
  return (
    <div
      className="absolute content-stretch flex gap-[8px] h-[48px] items-center p-[12px] right-[40px] rounded-[12px] top-[24px]"
      data-name="wallet"
    >
      <div className="relative shrink-0 size-[24px]">
        <img alt="" className="block max-w-none size-full" height="24" src={imgEllipse12} width="24" />
      </div>
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">
        oasis1...kf9pd
      </p>
      <Frame1 />
    </div>
  )
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-center w-full">
      <p className="font-['Mountains_of_Christmas:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[48px] text-white w-[502px]">
        Participation Successful!
      </p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] w-[min-content]">
        Thank you for participating in the Oasis Xmas Roffle! Good luck!
      </p>
    </div>
  )
}

function Frame16() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex h-[64px] items-center justify-between pl-[16px] pr-[8px] py-[8px] relative rounded-[12px] shrink-0 w-[400px]">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">
        Buy more tickets
      </p>
    </div>
  )
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full">
      <Frame6 />
      <Frame16 />
    </div>
  )
}

function SocialMediaIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Social Media Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1080)" id="Social Media Icon">
          <path d={svgPaths.p2ccee40} fill="var(--fill-0, #18181B)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1080">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function SocialMediaIcon1() {
  return <div className="shrink-0 size-[24px]" data-name="Social Media Icon" />
}

function Frame15() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-between pl-[16px] pr-[8px] py-[8px] relative rounded-[12px] shrink-0 w-[400px]">
      <SocialMediaIcon />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black text-center text-nowrap whitespace-pre">
        LinkedIn
      </p>
      <SocialMediaIcon1 />
    </div>
  )
}

function SocialMediaIcon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Social Media Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Social Media Icon">
          <path d={svgPaths.p38a22b70} fill="var(--fill-0, #18181B)" id="Vector" />
        </g>
      </svg>
    </div>
  )
}

function SocialMediaIcon3() {
  return <div className="shrink-0 size-[24px]" data-name="Social Media Icon" />
}

function Frame17() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-between pl-[16px] pr-[8px] py-[8px] relative rounded-[12px] shrink-0 w-[400px]">
      <SocialMediaIcon2 />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black text-center text-nowrap whitespace-pre">
        X
      </p>
      <SocialMediaIcon3 />
    </div>
  )
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Frame15 />
      <Frame17 />
    </div>
  )
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] text-center w-[min-content]">
        Share on social media
      </p>
      <Frame11 />
    </div>
  )
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <Frame14 />
      <Frame13 />
    </div>
  )
}

function Success() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-center right-[-540px] top-[calc(50%+32.5px)] translate-y-[-50%] w-[520px]"
      data-name="success"
    >
      <Frame7 />
    </div>
  )
}

function Group() {
  return (
    <div className="absolute bottom-[15px] contents left-[calc(50%+155px)] translate-x-[-50%]">
      <div
        className="absolute bottom-[15px] h-[80px] left-[calc(50%+155px)] translate-x-[-50%] w-[160px]"
        data-name="Union"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
          <g filter="url(#filter0_n_1_1018)" id="Union">
            <path d={svgPaths.p3416cc80} fill="var(--fill-0, #FFF47E)" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="80"
              id="filter0_n_1_1018"
              width="160"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence
                baseFrequency="4 4"
                numOctaves="3"
                result="noise"
                seed="4641"
                stitchTiles="stitch"
                type="fractalNoise"
              />
              <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA type="discrete" />
              </feComponentTransfer>
              <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
              <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
              <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
              <feMerge result="effect1_noise_1_1018">
                <feMergeNode in="shape" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      <div
        className="absolute bottom-[84.5px] flex h-[58.5px] items-center justify-center left-[calc(50%+201px)] translate-y-[100%] w-[18px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[90deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <p className="absolute bottom-[85px] font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] left-[calc(50%+101px)] not-italic text-[46px] text-neutral-800 text-nowrap translate-y-[100%] whitespace-pre">
        250
      </p>
      <div className="absolute bottom-[20px] h-[70px] left-[calc(50%+155px)] translate-x-[-50%] w-[132px]">
        <div className="absolute inset-[-0.71%_-0.38%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
            <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
              <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="71"
                id="filter0_g_1_921"
                width="133"
                x="0"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                <feDisplacementMap
                  height="100%"
                  in="shape"
                  result="displacedImage"
                  scale="1"
                  width="100%"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feMerge result="effect1_texture_1_921">
                  <feMergeNode in="displacedImage" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

function Group1() {
  return (
    <div className="absolute bottom-[15px] contents left-[calc(50%+155px)] translate-x-[-50%]">
      <Group />
    </div>
  )
}

function Group2() {
  return (
    <div className="absolute bottom-[1.06px] contents h-[115.888px] left-[calc(50%-104px)] translate-x-[-50%] w-[174.473px]">
      <div
        className="absolute bottom-[1.06px] flex h-[115.888px] items-center justify-center left-[calc(50%-104px)] translate-x-[-50%] w-[174.473px]"
        style={
          { '--transform-inner-width': '159.984375', '--transform-inner-height': '80' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[346.186deg]">
          <div className="h-[80px] relative w-[159.999px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_890)" id="Union">
                <path d={svgPaths.p6f93900} fill="var(--fill-0, #71E1E2)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_890"
                  width="159.999"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_890">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[102.93px] flex h-[61.106px] items-center justify-center left-[calc(50%-66.37px)] translate-y-[100%] w-[31.447px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[76.186deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[95.06px] flex h-[78.082px] items-center justify-center left-[calc(50%-163.6px)] translate-y-[100%] w-[94.925px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[346.186deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[9.25px] flex h-[99.492px] items-center justify-center left-[calc(50%-104px)] translate-x-[-50%] w-[144.896px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[346.186deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_954)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_954"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_954">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group3() {
  return (
    <div className="absolute bottom-[154.22px] contents h-[132.914px] left-[calc(50%+346.87px)] translate-x-[-50%] w-[178.166px]">
      <div
        className="absolute bottom-[154.22px] flex h-[132.914px] items-center justify-center left-[calc(50%+346.87px)] translate-x-[-50%] w-[178.166px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[338.576deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_857)" id="Union">
                <path d={svgPaths.p2a454600} fill="var(--fill-0, #71E1E2)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_857"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_857">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[271.52px] flex h-[61.033px] items-center justify-center left-[calc(50%+378.92px)] translate-y-[100%] w-[38.124px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[68.576deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[259.2px] flex h-[86.171px] items-center justify-center left-[calc(50%+285.64px)] translate-y-[100%] w-[99.181px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[338.576deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[163.99px] flex h-[113.378px] items-center justify-center left-[calc(50%+346.87px)] translate-x-[-50%] w-[148.448px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[338.576deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_921"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_921">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group4() {
  return (
    <div className="absolute bottom-[167.98px] contents h-[149.018px] left-[calc(50%-1.7px)] translate-x-[-50%] w-[178.592px]">
      <div
        className="absolute bottom-[167.98px] flex h-[149.018px] items-center justify-center left-[calc(50%-1.7px)] translate-x-[-50%] w-[178.592px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[330.153deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_795)" id="Union">
                <path d={svgPaths.p1d253a70} fill="var(--fill-0, #71E1E2)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_795"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_795">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[299.93px] flex h-[59.699px] items-center justify-center left-[calc(50%+23.51px)] translate-y-[100%] w-[44.727px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[60.153deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[282.94px] flex h-[93.349px] items-center justify-center left-[calc(50%-63.47px)] translate-y-[100%] w-[101.852px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[330.153deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[179.29px] flex h-[126.409px] items-center justify-center left-[calc(50%-1.7px)] translate-x-[-50%] w-[149.329px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[330.153deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_921"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_921">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group5() {
  return (
    <div className="absolute bottom-[31.31px] contents h-[123.685px] left-[calc(50%+206.24px)] translate-x-[-50%] w-[176.49px]">
      <div
        className="absolute bottom-[31.31px] flex h-[123.685px] items-center justify-center left-[calc(50%+206.24px)] translate-x-[-50%] w-[176.49px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[342.822deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_826)" id="Union">
                <path d={svgPaths.p22fd9980} fill="var(--fill-0, #FF8EE6)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_826"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_826">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[140.24px] flex h-[61.207px] items-center justify-center left-[calc(50%+241.48px)] translate-y-[100%] w-[34.474px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[72.822deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[130.38px] flex h-[81.836px] items-center justify-center left-[calc(50%+145.79px)] translate-y-[100%] w-[97.018px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[342.822deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[40.23px] flex h-[105.862px] items-center justify-center left-[calc(50%+206.24px)] translate-x-[-50%] w-[146.785px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[342.822deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_921"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_921">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group6() {
  return (
    <div className="absolute bottom-[165.58px] contents h-[148.42px] left-[calc(50%-365.68px)] translate-x-[-50%] w-[178.65px]">
      <div
        className="absolute bottom-[165.58px] flex h-[148.42px] items-center justify-center left-[calc(50%-365.68px)] translate-x-[-50%] w-[178.65px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[29.502deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_923)" id="Union">
                <path d={svgPaths.p416780} fill="var(--fill-0, #FF8EE6)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_923"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_923">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[242.81px] flex h-[59.779px] items-center justify-center left-[calc(50%-339.92px)] translate-y-[100%] w-[44.475px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[119.502deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[292.49px] flex h-[93.094px] items-center justify-center left-[calc(50%-427.45px)] translate-y-[100%] w-[101.785px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[29.502deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[176.83px] flex h-[125.928px] items-center justify-center left-[calc(50%-365.67px)] translate-x-[-50%] w-[149.356px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[29.502deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_921"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_921">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group7() {
  return (
    <div className="absolute bottom-[124px] contents left-[calc(50%+7px)] translate-x-[-50%]">
      <div
        className="absolute bottom-[124px] h-[80px] left-[calc(50%+7px)] translate-x-[-50%] w-[160px]"
        data-name="Union"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
          <g filter="url(#filter0_n_1_764)" id="Union">
            <path d={svgPaths.p1fdfbd00} fill="var(--fill-0, #FF8EE6)" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="80"
              id="filter0_n_1_764"
              width="160"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence
                baseFrequency="4 4"
                numOctaves="3"
                result="noise"
                seed="4641"
                stitchTiles="stitch"
                type="fractalNoise"
              />
              <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA type="discrete" />
              </feComponentTransfer>
              <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
              <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
              <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
              <feMerge result="effect1_noise_1_764">
                <feMergeNode in="shape" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      <div
        className="absolute bottom-[193.5px] flex h-[58.5px] items-center justify-center left-[calc(50%+53px)] translate-y-[100%] w-[18px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[90deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <p className="absolute bottom-[194px] font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] left-[calc(50%-47px)] not-italic text-[46px] text-neutral-800 text-nowrap translate-y-[100%] whitespace-pre">
        250
      </p>
      <div className="absolute bottom-[129px] h-[70px] left-[calc(50%+7px)] translate-x-[-50%] w-[132px]">
        <div className="absolute inset-[-0.71%_-0.38%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
            <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
              <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="71"
                id="filter0_g_1_921"
                width="133"
                x="0"
                y="0"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                <feDisplacementMap
                  height="100%"
                  in="shape"
                  result="displacedImage"
                  scale="1"
                  width="100%"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feMerge result="effect1_texture_1_921">
                  <feMergeNode in="displacedImage" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

function Group8() {
  return (
    <div className="absolute bottom-[158.29px] contents h-[105.707px] left-[calc(50%+132.58px)] translate-x-[-50%] w-[171.154px]">
      <div
        className="absolute bottom-[158.29px] flex h-[105.707px] items-center justify-center left-[calc(50%+132.58px)] translate-x-[-50%] w-[171.154px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[9.657deg]">
          <div className="h-[80px] relative w-[160.001px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_729)" id="Union">
                <path d={svgPaths.p26848880} fill="var(--fill-0, white)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_729"
                  width="160.001"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_729">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[232.51px] flex h-[60.691px] items-center justify-center left-[calc(50%+173.06px)] translate-y-[100%] w-[27.558px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[99.657deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[249.78px] flex h-[73.073px] items-center justify-center left-[calc(50%+74.31px)] translate-y-[100%] w-[91.889px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[9.657deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[165.57px] flex h-[91.151px] items-center justify-center left-[calc(50%+132.58px)] translate-x-[-50%] w-[141.872px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[9.657deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_762)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_762"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_762">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group9() {
  return (
    <div className="absolute bottom-[51.08px] contents h-[113.836px] left-[calc(50%+28px)] translate-x-[-50%] w-[173.863px]">
      <div
        className="absolute bottom-[51.08px] flex h-[113.836px] items-center justify-center left-[calc(50%+28px)] translate-x-[-50%] w-[173.863px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[12.956deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_698)" id="Union">
                <path d={svgPaths.pc96380} fill="var(--fill-0, white)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_698"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_698">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[126.44px] flex h-[61.046px] items-center justify-center left-[calc(50%+66.33px)] translate-y-[100%] w-[30.658px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[102.956deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[149.34px] flex h-[77.082px] items-center justify-center left-[calc(50%-31.35px)] translate-y-[100%] w-[94.339px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[12.956deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[59.09px] flex h-[97.813px] items-center justify-center left-[calc(50%+28px)] translate-x-[-50%] w-[144.334px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[12.956deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_921"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_921">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group10() {
  return (
    <div className="absolute bottom-[97.5px] contents h-[114.496px] left-[calc(50%-166.97px)] translate-x-[-50%] w-[174.063px]">
      <div
        className="absolute bottom-[97.5px] flex h-[114.496px] items-center justify-center left-[calc(50%-166.97px)] translate-x-[-50%] w-[174.063px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[346.769deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_987)" id="Union">
                <path d={svgPaths.p164bc00} fill="var(--fill-0, white)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_987"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_987">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[198.12px] flex h-[61.067px] items-center justify-center left-[calc(50%-128.94px)] translate-y-[100%] w-[30.911px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[76.769deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[190.59px] flex h-[77.404px] items-center justify-center left-[calc(50%-226.4px)] translate-y-[100%] w-[94.529px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[346.769deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[105.58px] flex h-[98.353px] items-center justify-center left-[calc(50%-166.97px)] translate-x-[-50%] w-[144.517px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[346.769deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_921"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_921">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group11() {
  return (
    <div className="absolute bottom-[0.47px] contents h-[133.534px] left-[calc(50%+283.12px)] translate-x-[-50%] w-[178.247px]">
      <div
        className="absolute bottom-[0.47px] flex h-[133.534px] items-center justify-center left-[calc(50%+283.12px)] translate-x-[-50%] w-[178.247px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[21.721deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_667)" id="Union">
                <path d={svgPaths.p309bf380} fill="var(--fill-0, #71E1E2)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_667"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_667">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[77.61px] flex h-[61.008px] items-center justify-center left-[calc(50%+315.12px)] translate-y-[100%] w-[38.372px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[111.721deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[115.09px] flex h-[86.457px] items-center justify-center left-[calc(50%+221.86px)] translate-y-[100%] w-[99.312px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[21.721deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[10.29px] flex h-[113.882px] items-center justify-center left-[calc(50%+283.12px)] translate-x-[-50%] w-[148.534px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[21.721deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_760)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_760"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_760">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group13() {
  return (
    <div className="absolute bottom-[149.31px] contents h-[119.687px] left-[calc(50%-112.24px)] translate-x-[-50%] w-[175.518px]">
      <div
        className="absolute bottom-[149.31px] flex h-[119.687px] items-center justify-center left-[calc(50%-112.24px)] translate-x-[-50%] w-[175.518px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[15.43deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_956)" id="Union">
                <path d={svgPaths.p1f14fe00} fill="var(--fill-0, #FFF47E)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_956"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_956">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[225.35px] flex h-[61.181px] items-center justify-center left-[calc(50%-75.61px)] translate-y-[100%] w-[32.916px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[105.43deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[252.44px] flex h-[79.921px] items-center justify-center left-[calc(50%-172.28px)] translate-y-[100%] w-[95.972px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[15.43deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[157.86px] flex h-[102.598px] items-center justify-center left-[calc(50%-112.24px)] translate-x-[-50%] w-[145.867px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[15.43deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_954)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_954"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_954">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group14() {
  return (
    <div className="absolute bottom-[27.45px] contents h-[97.013px] left-[calc(50%-247.71px)] translate-x-[-50%] w-[167.787px]">
      <div
        className="absolute bottom-[27.45px] flex h-[97.013px] items-center justify-center left-[calc(50%-247.71px)] translate-x-[-50%] w-[167.787px]"
        style={{ '--transform-inner-width': '160', '--transform-inner-height': '80' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[6.277deg]">
          <div className="h-[80px] relative w-[160px]" data-name="Union">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 80">
              <g filter="url(#filter0_n_1_1049)" id="Union">
                <path d={svgPaths.p24fab280} fill="var(--fill-0, #FFF47E)" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="80"
                  id="filter0_n_1_1049"
                  width="160"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feTurbulence
                    baseFrequency="4 4"
                    numOctaves="3"
                    result="noise"
                    seed="4641"
                    stitchTiles="stitch"
                    type="fractalNoise"
                  />
                  <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" />
                  </feComponentTransfer>
                  <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                  <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1" />
                  <feMerge result="effect1_noise_1_1049">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[100.25px] flex h-[60.117px] items-center justify-center left-[calc(50%-205.16px)] translate-y-[100%] w-[24.288px]"
        style={{ '--transform-inner-width': '58.5', '--transform-inner-height': '18' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[96.277deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] h-[18px] leading-[18px] not-italic relative text-[12px] text-neutral-800 w-[58.5px]">
            24122025
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[111.68px] flex h-[68.715px] items-center justify-center left-[calc(50%-304.67px)] translate-y-[100%] w-[89.062px]"
        style={
          { '--transform-inner-width': '76.75', '--transform-inner-height': '54' } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[6.277deg]">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[normal] not-italic relative text-[46px] text-neutral-800 text-nowrap whitespace-pre">
            250
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[33.95px] flex h-[84.012px] items-center justify-center left-[calc(50%-247.71px)] translate-x-[-50%] w-[138.862px]"
        style={{ '--transform-inner-width': '132', '--transform-inner-height': '70' } as React.CSSProperties}
      >
        <div className="flex-none rotate-[6.277deg]">
          <div className="h-[70px] relative w-[132px]">
            <div className="absolute inset-[-0.71%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 71">
                <g filter="url(#filter0_g_1_921)" id="Rectangle 4">
                  <path d={svgPaths.p85ee0c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="71"
                    id="filter0_g_1_921"
                    width="133"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feTurbulence baseFrequency="2 2" numOctaves="3" seed="3260" type="fractalNoise" />
                    <feDisplacementMap
                      height="100%"
                      in="shape"
                      result="displacedImage"
                      scale="1"
                      width="100%"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                    <feMerge result="effect1_texture_1_921">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group12() {
  return (
    <div className="absolute bottom-[0.47px] contents left-[calc(50%-9.52px)] translate-x-[-50%]">
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
      <Group10 />
      <Group11 />
      <Group13 />
      <Group14 />
    </div>
  )
}

function Frame24() {
  return (
    <div className="absolute h-[240px] left-[calc(50%+12px)] overflow-clip top-0 translate-x-[-50%] w-[910px]">
      <Group12 />
    </div>
  )
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-center w-full">
      <p className="font-['Mountains_of_Christmas:Regular',sans-serif] leading-[64px] not-italic relative shrink-0 text-[56px] text-white w-full">
        Xmas Roffle
      </p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] w-full">
        Participate in the Oasis Xmas Roffle! The initial pot is 100,000 ROSE and grows with each ticket purchased
        which costs 250 ROSE.
      </p>
    </div>
  )
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
      <p className="font-['Geist:Medium',sans-serif] font-medium relative shrink-0">Amount</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal opacity-60 relative shrink-0">
        (max 10 tickets per account)
      </p>
    </div>
  )
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center leading-[20px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">
      <p className="font-['Geist:Medium',sans-serif] font-medium relative shrink-0 text-white">1 ticket</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[rgba(255,255,255,0.5)]">
        (250 ROSE)
      </p>
    </div>
  )
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame 2">
          <path d="M8 10L12 14L16 10" id="Rectangle 5" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

function Frame() {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] h-[48px] relative rounded-[12px] shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[48px] items-center justify-between pl-[16px] pr-[12px] py-[12px] relative w-full">
          <Frame10 />
          <Frame2 />
        </div>
      </div>
    </div>
  )
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame20 />
      <Frame />
    </div>
  )
}

function CryptoIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Crypto Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Crypto Icon" opacity="0.5">
          <path d={svgPaths.p35bbc080} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  )
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <CryptoIcon />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">
        ROSE
      </p>
    </div>
  )
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame 2">
          <path d="M8 10L12 14L16 10" id="Rectangle 5" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

function Frame4() {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] h-[48px] relative rounded-[12px] shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[48px] items-center justify-between p-[12px] relative w-full">
          <Frame12 />
          <Frame3 />
        </div>
      </div>
    </div>
  )
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
        Pay in
      </p>
      <Frame4 />
    </div>
  )
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame19 />
      <Frame18 />
    </div>
  )
}

function BigButton() {
  return (
    <div
      className="bg-white content-stretch flex h-[64px] items-center justify-between pl-[16px] pr-[8px] py-[8px] relative rounded-[12px] shrink-0 w-[400px]"
      data-name="big_button"
    >
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">
        Buy 1 Ticket for 250 ROSE
      </p>
    </div>
  )
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[400px]">
      <Frame21 />
      <BigButton />
    </div>
  )
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full">
      <Frame9 />
      <Frame5 />
    </div>
  )
}

function BuyTickets() {
  return (
    <div
      className="content-stretch flex flex-col items-center relative shrink-0 w-full"
      data-name="buy tickets"
    >
      <Frame23 />
    </div>
  )
}

function Frame22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[520px] top-1/2 translate-y-[-50%] w-[400px]">
      <BuyTickets />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[18px] opacity-60 relative shrink-0 text-[12px] text-center text-white w-full">
        <span>{`By participating you agree to our `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">
          Terms and Conditions
        </span>
        .
      </p>
    </div>
  )
}

function Frame26() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0.15)] grow min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[40px] py-[20px] relative text-center w-full">
          <p className="font-['Geist:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">
            Days to go
          </p>
          <p className="font-['Mountains_of_Christmas:Regular',sans-serif] leading-[56px] not-italic relative shrink-0 text-[48px] text-white w-full">
            6
          </p>
        </div>
      </div>
    </div>
  )
}

function Frame25() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0.15)] grow min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[40px] py-[20px] relative text-center w-full">
          <p className="font-['Geist:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">
            Tickets left
          </p>
          <p className="font-['Mountains_of_Christmas:Regular',sans-serif] leading-[56px] not-italic relative shrink-0 text-[48px] text-white w-full">
            2354
          </p>
        </div>
      </div>
    </div>
  )
}

function Frame27() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0.15)] grow min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[40px] py-[20px] relative text-center w-full">
          <p className="font-['Geist:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">
            Pot size
          </p>
          <p className="font-['Mountains_of_Christmas:Regular',sans-serif] leading-[56px] not-italic relative shrink-0 text-[48px] text-white w-full">
            1.024.020
          </p>
        </div>
      </div>
    </div>
  )
}

function Frame28() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[40px] top-[844px] w-[1360px]">
      <Frame26 />
      <Frame25 />
      <Frame27 />
    </div>
  )
}

export function HomeWalletConnected() {
  return (
    <div
      className="relative size-full"
      data-name="Home_wallet_connected"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1440 1024\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(4.4087e-15 51.2 -72 3.1351e-15 720 512)\\\'><stop stop-color=\\\'rgba(25,50,60,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(10,29,36,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')",
      }}
    >
      <Frame8 />
      <div className="absolute h-[48px] left-[40px] top-[24px] w-[131px]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131 48">
          <g id="Union">
            <path clipRule="evenodd" d={svgPaths.p1f562c00} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2b736500} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p1bd1ab00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2a757eb0} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p3d36a900} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p19eb9c00} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
      <Wallet />
      <Success />
      <Frame24 />
      <Frame22 />
      <Frame28 />
    </div>
  )
}
