import LoadingDots from "../LoadingDots/LoadingDots"
function GenerateButton({ loading , generateQuestions}: { loading: boolean, generateQuestions: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <div>

            {!loading && (
                <button
                    className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                    onClick={(e) => generateQuestions(e)}
                >
                    Generate your questions&rarr;
                </button>
            )}
            {loading && (
                <button
                    className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                    disabled
                >
                    <LoadingDots color="white" style="large" />
                </button>
            )}
        </div>
    )
}

export default GenerateButton