import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "./restaurant-info-card.component";

// StatusBar.currentHeight is not supported in ios,
// hence the conditional statement
// see docs: safe_area_view
const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestauranrtListContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;
// background-color: lightyellow;

export const RestaurantScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <RestauranrtListContainer>
      <RestaurantInfoCard />
    </RestauranrtListContainer>
  </SafeArea>
);
