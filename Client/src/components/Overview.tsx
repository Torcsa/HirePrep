import HRService from "../services/HRService.ts";
import Module from "./Module.tsx";

export default function Overview(props: { cv: string }) {

    const service = new HRService();

    async function getCompetences(): Promise<string> {
        return await service.getCompetences(props.cv);
    }

    function getStreamCompetences() {
        return service.streamCompetences(props.cv)
    }



    async function getPositions(): Promise<string> {
        return await service.getPositions(props.cv);
    }

    function getStreamPositions() {
        return service.streamPositions(props.cv)
    }



    async function getData(): Promise<string> {
        return await service.getData(props.cv);
    }
    function getStreamData() {
        return service.streamData(props.cv)
    }

    return (
        <div className="row">
            <div className="col-8">
                <Module title="Data" getter={getData} streamGetter={getStreamData} />
                <Module title="Key competences" getter={getCompetences} streamGetter={getStreamCompetences} />
            </div>
            <div className="col-4">
                <Module title="Positions" getter={getPositions} streamGetter={getStreamPositions} />
            </div>
        </div>
    );
}
