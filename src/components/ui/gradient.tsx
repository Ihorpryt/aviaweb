import gradientImage from '@/assets/gradient.png';

function Gradient() {
    return (
        <div className="absolute inset-0 h-[186px] overflow-hidden">
            <img
                src={gradientImage}
                alt="Background"
                className="w-full h-full object-cover"
            />
        </div>
    )
}

export default Gradient