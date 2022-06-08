import React, { useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { StyleSheet } from 'react-native';

import Dropdown from 'components/Dropdown';
import { isNotDefined } from 'utils/ramda';

const GET_REGIONS_QUERY_NAME = 'GetRegions';
const GET_REGIONS = gql`
  query GetRegions {
    ${GET_REGIONS_QUERY_NAME} {
	id
	name
    }
  }
`;

const placeholder = 'Select your region';

const schema = {
  label: 'name', // BE label name is name
  value: 'id', // BE value name is id
  icon: 'icon',
  parent: 'parent',
  selectable: 'selectable',
  disabled: 'disabled',
};

const RegionDropdown = ({ value, setValue, ...rest }) => {
  const { loading, data, refetch } = useQuery(GET_REGIONS, {});
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setItems(data[GET_REGIONS_QUERY_NAME]);
    }
    return () => {};
  }, [data, loading]);

  return (
    // wrapping Dropdown in View will prevents Password hint text from overlapping modal
    //<View style={{ position: 'relative', zIndex: 1 }}>
    <>
      <Dropdown
        title={'REGION'}
        schema={schema}
        value={value}
        items={items}
        setValue={setValue}
        loading={loading}
        setItems={setItems}
        onOpen={() => isNotDefined(items) && refetch()}
        placeholder={placeholder}
        containerStyle={s.containerStyle}
        {...rest}
      />
    </>
  );
};

export default RegionDropdown;

const s = StyleSheet.create({
  containerStyle: {
    paddingBottom: 15,
  },
  style: {},
  // textStyle styles all text (base styles)
  textStyle: {},
  // labelStyle styles the selected item text
  labelStyle: {},
  // listItemLabelStyle styles the labels items in the list
  listItemLabelStyle: {},
  // placeholderStyle styles the placeholder before an item is selected
  placeholderStyle: {},
  itemSeparatorStyle: {},
  dropDownContainerStyle: {},
  selectedItemLabelStyle: {},
});
