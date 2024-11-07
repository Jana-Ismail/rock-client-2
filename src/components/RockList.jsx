import { useEffect } from "react"

export const RockList = ({ rocks, fetchRocks, showAll }) => {
    useEffect(() => {
        fetchRocks(showAll)
    }, [showAll])

    const throwRock = async (rockId) => {

        await fetch(`http://localhost:8000/rocks/${rockId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        })
        await fetchRocks()
    }

    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map(rock => (
                    <div key={`key-${rock.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                        <div>
                            {rock.name} ({rock.type.label}) weighs {rock.weight} kg
                        </div>
                        <div>
                            In the collection of {rock.user.first_name} {rock.user.last_name}
                        </div>
                        <div>
                            {!showAll && (
                                <button 
                                    className="px-3 py-1.5 border-solid bg-red-600 text-red-50 mt-4 hover:text-white hover:bg-black"
                                    onClick={(e)=> {throwRock(rock.id)}}
                                >DELETE</button>
                            )}
                        </div>
                    </div>
                
                )
            )
        }

        return <h3>Loading Rocks...</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Rock List</h1>
            {displayRocks()}
        </>
    )
}
