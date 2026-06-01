export default function TalkPage() {
  return (
    <section className="min-h-[calc(100vh-clamp(68px,9vh,96px))] min-h-[calc(100svh-clamp(68px,9vh,96px))] p-[clamp(24px,4vw,56px)] max-[720px]:px-[18px] max-[720px]:pt-[28px] max-[720px]:pb-[40px] max-[430px]:px-[12px] max-[430px]:pt-[46px] max-[430px]:pb-[34px] grid items-center">
      <div className="w-[min(100%,1040px)] min-w-0 p-[clamp(24px,4vw,44px)] border-[0.5px] border-tan/40 rounded-[clamp(16px,2vw,26px)] bg-cream/85 backdrop-blur-[10px] max-[720px]:w-full max-[720px]:min-h-auto max-[430px]:p-[24px] max-[430px]:w-[calc(100vw-24px)] max-[430px]:max-w-[calc(100vw-24px)]">
        <h2 className="mt-0 mx-0 mb-[6px] text-charcoal text-[clamp(28px,4vw,48px)] font-medium">Talk? 🎄</h2>
        <p className="mt-0 mx-0 mb-[24px] text-stone text-[clamp(14px,1.35vw,18px)] leading-[1.6]">
          Whether it&apos;s a project, opportunity, or just to chat, I&apos;m
          around.
        </p>
        <div className="max-w-[560px]">
          <label className="block mb-[16px]">
            <span className="block mb-[6px] text-stone text-[12px]">Name</span>
            <input
              className="w-full px-[12px] py-[9px] border-[0.5px] border-tan/50 rounded-lg outline-none bg-surface/70 text-charcoal text-[13px]"
              placeholder="Your name"
              type="text"
            />
          </label>
          <label className="block mb-[16px]">
            <span className="block mb-[6px] text-stone text-[12px]">Email</span>
            <input
              className="w-full px-[12px] py-[9px] border-[0.5px] border-tan/50 rounded-lg outline-none bg-surface/70 text-charcoal text-[13px]"
              placeholder="you@example.com"
              type="email"
            />
          </label>
          <label className="block mb-[16px]">
            <span className="block mb-[6px] text-stone text-[12px]">Message</span>
            <textarea
              className="w-full px-[12px] py-[9px] border-[0.5px] border-tan/50 rounded-lg outline-none bg-surface/70 text-charcoal text-[13px] min-h-[100px] resize-y"
              placeholder="What's on your mind?"
            />
          </label>
          <a
            className="inline-flex items-center justify-center min-h-[44px] px-[22px] py-[10px] rounded-lg cursor-pointer text-[clamp(14px,1.25vw,17px)] font-medium border-none bg-red text-cream max-[430px]:w-full w-full transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(184,84,80,0.35)] hover:bg-[#c45c58] active:translate-y-0 active:shadow-md"
            href="mailto:hello@example.com"
          >
            Send it
          </a>
          <div className="flex flex-wrap gap-[10px] mt-[24px]">
            <button className="cursor-pointer px-[14px] py-[7px] border-[0.5px] border-tan/50 rounded-[20px] bg-transparent text-stone text-[12px] transition-[background-color,color,border-color,transform] duration-200 hover:bg-tan/15 hover:text-charcoal hover:border-tan hover:-translate-y-[1px] active:translate-y-0" type="button">
              GitHub
            </button>
            <button className="cursor-pointer px-[14px] py-[7px] border-[0.5px] border-tan/50 rounded-[20px] bg-transparent text-stone text-[12px] transition-[background-color,color,border-color,transform] duration-200 hover:bg-tan/15 hover:text-charcoal hover:border-tan hover:-translate-y-[1px] active:translate-y-0" type="button">
              LinkedIn
            </button>
            <a className="cursor-pointer px-[14px] py-[7px] border-[0.5px] border-tan/50 rounded-[20px] bg-transparent text-stone text-[12px] transition-[background-color,color,border-color,transform] duration-200 hover:bg-tan/15 hover:text-charcoal hover:border-tan hover:-translate-y-[1px] active:translate-y-0" href="mailto:hello@example.com">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
