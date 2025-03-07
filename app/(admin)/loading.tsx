import Avatar from "@/components/avatar";

function loading() {
    return (
        <div className="mx-auto animate-spin p-10">
            <Avatar seed="Support_agent" />
        </div>
    );
}

export default loading;