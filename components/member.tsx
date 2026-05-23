const Member = ({ memberType, isOwner }: { memberType: string; isOwner: boolean }) => {
    return (
        <div className="w-full p-4 flex justify-between">
            {memberType}
            <div
                className="px-3 rounded-2xl font-mono"
                style={{
                    backgroundColor: isOwner
                        ? "var(--color-red-400)"
                        : "var(--color-green-400)",
                }}
            >
                {isOwner ? "owner" : "member"}
            </div>
        </div>
    );
};

export default Member;
