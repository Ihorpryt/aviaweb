function Gradient() {
    return (
        <div
            className="absolute inset-0 h-[186px] overflow-hidden"
            style={{ backgroundColor: '#100A37' }}
        >
            {/* Teal wave blob - left */}
            <svg
                className="absolute animate-blob-1"
                width="954"
                height="46"
                viewBox="0 0 954 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    top: '120px',
                    left: '-300px',
                    width: '100%',
                    height: 'auto',
                    filter: 'blur(40px)',
                    opacity: '0.8',
                }}
            >
                <path d="M953.036 292.975C953.036 376.183 585.433 173.062 377.143 173.062C168.852 173.062 0 233.868 0 150.66C0 67.453 168.852 0 377.143 0C585.433 0 953.036 209.768 953.036 292.975Z" fill="#51E5DC" />
            </svg>

            {/* Pink/Light blob - center */}
            <svg
                className="absolute animate-blob-2"
                width="1452"
                height="176"
                viewBox="0 0 1452 176"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: 'auto',
                    filter: 'blur(40px)',
                }}
            >
                <g opacity="0.3" filter="url(#filter0_f_2380_11771)">
                    <path d="M200.216 -344.852C243.416 -388.861 315.764 -383.662 352.227 -333.929L608.815 16.0419C622.77 35.0759 643.008 48.5606 665.947 54.1103L1021.6 140.151C1047.94 146.525 1070.57 163.319 1084.3 186.688L1283.45 525.622C1306.35 564.592 1300.26 614.077 1268.6 646.333L1222.25 693.552C1183.56 732.965 1120.24 733.553 1080.83 694.864L183.949 -185.528C144.536 -224.217 143.948 -287.53 182.637 -326.943L200.216 -344.852Z" fill="#f38affff" />
                </g>
                <defs>
                    <filter id="filter0_f_2380_11771" x="0" y="-528.803" width="1451.24" height="1406.3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="77" result="effect1_foregroundBlur_2380_11771" />
                    </filter>
                </defs>
            </svg>

            {/* Cyan wave blob - bottom */}
            <svg
                className="absolute animate-blob-3"
                width="967"
                height="94"
                viewBox="0 0 967 94"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    bottom: '-50px',
                    left: '300px',
                    width: '100%',
                    height: 'auto',
                    filter: 'blur(190px)',
                }}
            >
                <path d="M0 158.567C0 241.774 967.735 266.181 1176.03 266.181C1384.32 266.181 722.291 207.074 722.291 123.867C722.291 40.6591 697.897 0 489.607 0C281.317 0 0 75.3594 0 158.567Z" fill="#3FBCEE" />
            </svg>

            {/* CSS animations */}
            <style>{`
                @keyframes blob-float-1 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(30px, 20px) scale(1.05);
                    }
                    50% {
                        transform: translate(10px, -10px) scale(0.95);
                    }
                    75% {
                        transform: translate(-20px, 15px) scale(1.02);
                    }
                }
                @keyframes blob-float-2 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(-20px, -15px) scale(0.98);
                    }
                    50% {
                        transform: translate(25px, 10px) scale(1.04);
                    }
                    75% {
                        transform: translate(15px, -20px) scale(1);
                    }
                }
                @keyframes blob-float-3 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(15px, 25px) scale(1.03);
                    }
                    50% {
                        transform: translate(-25px, -5px) scale(0.97);
                    }
                    75% {
                        transform: translate(-10px, 20px) scale(1.05);
                    }
                }
                .animate-blob-1 {
                    animation: blob-float-1 12s ease-in-out infinite;
                }
                .animate-blob-2 {
                    animation: blob-float-2 14s ease-in-out infinite;
                }
                .animate-blob-3 {
                    animation: blob-float-3 16s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default Gradient