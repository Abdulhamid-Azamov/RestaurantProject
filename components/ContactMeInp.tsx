const ContactMeInp = ({ type, placeholder, value, onChange }: {
    type: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) => {
    return (
        <div className="mb-4">
            {type === "textarea" ? (
                <textarea placeholder={placeholder} value={value} onChange={onChange} className="w-full border px-6 py-4 text-[16px] outline-none resize-none h-32" />
            ) : (
                <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full border px-6 py-4 text-[16px] outline-none" />
            )}
        </div>
    )
}

export default ContactMeInp