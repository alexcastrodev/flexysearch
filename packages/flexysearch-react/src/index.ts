import useFlexysearch from './hooks/useFlexyseach';
import FlexysearchProvider from './provider/FlexysearchProvider';

const moduleToExport = {
    Provider: FlexysearchProvider,
    hook: useFlexysearch,
}

export { useFlexysearch, FlexysearchProvider }
export default moduleToExport