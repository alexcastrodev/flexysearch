import FlexysearchProvider, {
  useFlexysearchProvider,
} from './provider/FlexysearchProvider';

const useFlexysearch = useFlexysearchProvider;

const moduleToExport = {
  Provider: FlexysearchProvider,
  hook: useFlexysearch,
};

export { useFlexysearch, FlexysearchProvider };
export default moduleToExport;
