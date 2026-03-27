import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

const CustomInput = ({ type, placeholder, value, onChange, error }: CustomInputType) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
        <div className="mb-5 w-full">
            <div className="relative">
                <input type={inputType} placeholder={placeholder} value={value} onChange={onChange} className="outline-none w-full border-b-2 py-2.5 text-[16px] text-[#585858] leading-[150%] font-glory bg-transparent" />
                {isPassword && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#585858]"  >
                        {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-[12px] mt-1">{error}</p>
            )}
        </div>
    )
}

export default CustomInput