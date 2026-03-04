export function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute right-[120px] top-[130px] h-[446px] w-[446px] rounded-full bg-[#FC4FF6]/20 blur-[100px]" />
      <div className="absolute left-[40px] top-[90px] h-[462px] w-[464px] rounded-full bg-[#8593E8]/20 blur-[100px]" />
      <div className="absolute left-1/2 top-[0px] h-[467px] w-[467px] -translate-x-1/2 rounded-full bg-[#5D6EF3]/20 blur-[125px]" />
    </div>
  );
}