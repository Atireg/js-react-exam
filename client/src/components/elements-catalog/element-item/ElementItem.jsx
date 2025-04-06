import { useGetOneProject } from "../../../api/projectsApi";
import idSlicer from "../../../utils/idSlicer";

export default function ElementItem(
    {
        id,
        profileType,
        projectId,
        length,
    }
) {

    // async addToMyBasketHandler(){
    //     await 
    // }

    const { project } = useGetOneProject(projectId);

    return (
        <li className='elements-item'>
            <p><strong>ElementId: #{idSlicer(id)}</strong></p>
            <p>Profil: {profileType}</p>
            <p>Project: {project.name}</p>
            <p>Length: {length}m</p>
            <button className="grab-button">Grab!</button>
        </li>
    )
}



// const elementsUrl = 'http://localhost:3030/data/elements'
// class ElementItem extends Component {
//     constructor(props) {
//         super(props)

//         this.addToMyListHandler = this.addToMyListHandler.bind(this) // CONTEXT BINDING SO THIS CAN POINT AT THE COMPONENT NOT AT THE BUTTON
//     }

//     async addToMyListHandler(){
//         // await request.get(`${elementsUrl}/${this.props.id}`);
//         await this.props.auth.request.get(`${elementsUrl}/${this.props.id}`);

//         this.props.onSend(this.props.id)
//     }

//     render() {
//         return (
//             <li>
//                 <ul>
//                     <li className='elements-item'>{ this.props.content }</li>
//                     <li className='elements-item'><button onClick= {this.addToMyListHandler.bind(this)}>Grab!</button></li>
//                 </ul>
//             </li>
//         )
//     }
// }

// const ElementItemWithAuth = withAuth(ElementItem);

// export default ElementItemWithAuth