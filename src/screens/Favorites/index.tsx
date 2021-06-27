// React
import React, { memo, useState, useCallback, useRef, useMemo } from 'react'

// Components
import { View, FlatList, Text, ScrollView, Alert, StatusBar, LayoutAnimation } from 'react-native'
import FavoriteItem from './FavoriteItem'
import SectionList from './SectionList'
import ShareModal from '../ShareModal'
import { FancyTabs } from '@components'
import Header from './Header'

// Helpers
import { usePlaceLists, usePlaceListItems } from '@helpers'

// Constants
import { font, color } from '@constants'

// Types
import { Props as SectionListProps } from './SectionList'
import { Ref as ShareModalRef } from '../ShareModal'
import { FancyTabsProps } from '@components'

// Data
import { favorites, establishments } from './data'


export default memo(() => {

    // const [index, setIndex] = useState(0);
    // const [state, setState] = useState<StateEvent>()

    const shareModalRef = useRef<ShareModalRef>(null);

    const [placeLists, placeListsResult] = usePlaceLists({ first: 100 });

    // const onChange = useCallback<SectionListProps['onChange']>(
    //     index => setIndex(index),
    //     []
    // );

    const onSharePress = () => {
        // Alert.alert('Share');
        shareModalRef.current?.open();
    };

    const [index, setIndex] = useState(0);

    const tabs = useMemo(
        () => {
            if (!placeLists) return [];
            return placeLists?.edges.map(
                item => item.node
            );
        },
        [placeLists]
    );

    const onChange = useCallback<FancyTabsProps['onChange']>(
        ({ item, index }) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIndex(index);
        },
        []
    );

    const placeListId = placeLists?.edges?.[index]?.node?.id;

    const [placeListItems, placeListItemsResult] = usePlaceListItems({
        placeListId: placeListId,
        skip: !placeListId,
        first: 50,
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await placeListItemsResult.refetch();
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <View style={{ backgroundColor: '#f8f8f8', flex: 1 }}>
            
            <Header
                onSharePress={onSharePress}
                title='Liked restaurants'
            />
            
            {tabs?.length > 0 && (
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <FancyTabs
                        color={color.primary}
                        onChange={onChange}
                        data={tabs}
                    />
                </View>
            )}

            <FlatList
                renderItem={({ item }) => (
                    <FavoriteItem
                        item={item.node}
                        onPress={null}
                    />
                )}
                // contentContainerStyle={{
                //     // paddingHorizontal: 5,
                //     // paddingBottom: 120,
                //     // marginTop: 10,
                // }}
                keyExtractor={({ node: { id } }) => id}
                data={placeListItems?.edges}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

            {/* <ScrollView>
                <Text>
                    {JSON.stringify({ placeListId, placeListItems }, null, 4)}
                </Text>
            </ScrollView> */}

            {/* <SectionList
                onChange={onChange}
                data={favorites}
                index={index}
            />

            <FlatList
                data={establishments}
                keyExtractor={({ id }) => id}
                numColumns={2}
                contentContainerStyle={{
                    paddingHorizontal: 5,
                    paddingBottom: 120,
                    marginTop: 10,
                }}
                renderItem={({ item }) => (
                    <FavoriteItem
                        item={item}
                        onPress={null}
                    />
                )}
            /> */}

            {/* <ShareModal
                ref={shareModalRef}
                onSendPress={null}
            /> */}

        </View>
    )
})