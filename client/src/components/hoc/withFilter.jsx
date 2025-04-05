import { useSearchElements } from "../../api/elementsApi";

export default function withFilter(Component) {
    const WrapperComponent = (props) => {
        const filteredElements = useSearchElements("Holz")
        console.log(Component);

        return <Component {...props} elements={filteredElements} />
    }

    return WrapperComponent;
}

