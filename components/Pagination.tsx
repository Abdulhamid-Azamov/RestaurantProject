"use client"

const getPageRange = (current: number, total: number, siblings: number): (number | "...")[] => {
    const left = current - siblings
    const right = current + siblings + 1
    const range: number[] = []
    const result: (number | "...")[] = []
    let prev: number | undefined

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= left && i < right)) {
            range.push(i)
        }
    }

    for (const page of range) {
        if (prev !== undefined) {
            if (page - prev === 2) result.push(prev + 1)
            else if (page - prev > 2) result.push("...")
        }
        result.push(page)
        prev = page
    }

    return result
}

const Pagination = ({ total, current, onChange, siblings = 1 }: PaginationProps) => {
    const pages = getPageRange(current, total, siblings)

    const base = "w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 select-none cursor-pointer"
    const active = "bg-[#c8533a] text-white"
    const inactive = "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    const arrow = "text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"

    return (
        <div className="flex items-center justify-center gap-1 mt-8">
            <button className={`${base} ${arrow}`} onClick={() => onChange(current - 1)} disabled={current === 1} aria-label="Oldingi" >
                ‹
            </button>
            {pages.map((p, i) =>
                p === "..." ? (
                    <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-xs tracking-widest" >
                        ···
                    </span>
                ) : (
                    <button key={p} className={`${base} ${p === current ? active : inactive}`} onClick={() => onChange(p)} aria-current={p === current ? "page" : undefined}  >
                        {p}
                    </button>
                )
            )}
            <button className={`${base} ${arrow}`} onClick={() => onChange(current + 1)} disabled={current === total} aria-label="Keyingi" >
                ›
            </button>
        </div>
    )
}

export default Pagination