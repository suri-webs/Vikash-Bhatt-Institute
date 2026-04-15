"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@base-ui/react/button";
import { Download } from "lucide-react";
import { User } from "@/hooks/useAuth"


interface Result {
    rollNumber: string,
    subject: string
    month: string,
    url: string,
    week: string,


}

let mockResults: Result[] = [];
interface ProfileCardProps {
    user: User | null;
    displayName: string;
    role: string;
    userId: string;
    rollNumber: string | number;
    classIn: string;
}

const Months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

export function ResultCard({
    user,
    userId,
    role,
    displayName,
    rollNumber,
    classIn,
}: ProfileCardProps) {

    const [show, setShow] = useState(false);
    const [changeMonth, setChangeMonth] = useState<string | null>(null);
    const [filteredResults, setFilteredResults] = useState<Result[]>([]);
    const handleDownload = (url: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "Result.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    //here ur getting users 
    async function handleOnTrigger() {
        const res = await fetch(`http://localhost:3001/api/results?role=${role}&username=${displayName}&rollNumber=${rollNumber}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        mockResults = data.results;
        console.log(data.results);
    }

    function handleOnClick(target: string) {
        const results = mockResults.filter(r => r.month === target);
        setChangeMonth(target);
        setFilteredResults(results);
        setShow(true);
    }

    return (
        <div>
            <Card className="border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-2 px-4">
                    <div className="flex items-center justify-around gap-4">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">Results</h2>
                        </div>


                        <DropdownMenu>
                            <DropdownMenuTrigger className=" border-gray-300 rounded-xl px-4 py-2 border bg-background 
                                                    hover:bg-muted hover:text-foreground aria-expanded:bg-muted
                                                     aria-expanded:text-foreground dark:border-input dark:bg-input/30
                                                      dark:hover:bg-input/50" onClick={handleOnTrigger}  >
                                View
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {Months.map((month, index) => (
                                    <DropdownMenuItem key={index} onClick={(e) => {
                                        handleOnClick(Months[index])
                                    }}>
                                        {month}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </CardContent>
            </Card >

            {show ? (
                <Card className="border-gray-100 shadow-sm mt-5 rounded-2xl">
                    <CardContent className="p-2 px-4">
                        <div className="flex items-center justify-around gap-4">
                            <h2 className="text-lg font-bold text-gray-800 leading-tight truncate">
                                {changeMonth}
                            </h2>
                        </div>
                        {filteredResults.length > 0 ? (
                            <div className="mt-2 flex flex-col gap-2">
                                {filteredResults.map((result, index) => (
                                    <div key={index} className="flex hover:text-primary flex-row justify-between border-b hover:border-blue-400 last:border-0 py-2">
                                        <div className="font-medium">{result.subject}</div>
                                        <div className="text-sm text-gray-500">{result.week}</div>
                                        <div className="text-primary cursor-pointer" onClick={() => handleDownload(result.url)}>
                                            Download
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-gray-600 text-center">No data found...!</h3>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div></div>
            )}

        </div>
    );
}
