export default function MenuCard({ name, price, imageUrl, image, onOrder }) {
  const src = imageUrl || image

  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/5]">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="w-8 h-0.5 bg-[#D89B3F] mb-2" />
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-serif font-bold text-white text-lg leading-tight truncate">{name}</h3>
            <p className="text-[#D89B3F] font-sans font-semibold text-sm mt-1">{price}</p>
          </div>
          {onOrder && (
            <button
              onClick={(e) => { e.stopPropagation(); onOrder() }}
              className="flex-shrink-0 bg-[#D89B3F] text-white text-xs font-sans font-semibold px-3 py-1.5 rounded-full hover:bg-[#c4882e] transition-colors whitespace-nowrap"
            >
              Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
