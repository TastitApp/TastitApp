// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    searchText?: string,
    around?: number[],
    radius?: number,
    skip?: boolean,
    after?: string,
    first: number,
    name?: string,
    area?: string,
}

export default (args: Args) => {

    const { searchText, first, after, name, area, around, radius, skip } = args;

    const result = useQuery<
        graph.PlacesResult,
        graph.PlacesArgs
    >(
        graph.PLACES,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                searchText,
                around,
                radius,
                after,
                first,
                name,
                area,
            },
            skip,
        }
    );

    const places = result.data?.places;

    return [places, result] as [typeof places, typeof result];
}