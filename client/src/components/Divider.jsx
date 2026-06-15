export default function Divider({ light = false }) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className={`h-px w-12 ${light ? 'bg-white/30' : 'bg-[#D89B3F]/40'}`} />
      <svg
        className={`w-5 h-5 ${light ? 'text-white/60' : 'text-[#D89B3F]'}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
      <div className={`h-px w-12 ${light ? 'bg-white/30' : 'bg-[#D89B3F]/40'}`} />
    </div>
  )
}
