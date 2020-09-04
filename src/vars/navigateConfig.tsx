import {CardStyleInterpolators, TransitionSpecs} from "@react-navigation/stack";
import * as React from "react";

//https://reactnavigation.org/docs/stack-navigator/#transitionpresets
export const optionAnimationLeft = (showHeader = false): any => ({
    headerShown: showHeader,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,//FadeInFromBottomAndroidSpec,
        close: TransitionSpecs.TransitionIOSSpec
    },
    gestureResponseDistance: {
        horizontal: 20
    },
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    animationTypeForReplace: 'pop'
})


export const getHeaderOptions = (LeftIcon: React.FC | null, RightIcon: React.FC | null, CenterIcon: React.FC | null) => ({
    headerRight: RightIcon ? () => (
        <RightIcon/>
    ) : null,
    headerLeft: LeftIcon ? () => (
        <LeftIcon/>
    ) : null,
    headerLeftContainerStyle: {
        paddingLeft: 20,
    },
    headerRightContainerStyle: {
        paddingRight: 20
    },
    headerTitle: CenterIcon ? () => <CenterIcon/> : null,

})

export const getHeaderStyle = () => ({
    headerStyle: {
        // elevation: 0,
        // shadowColor: 'rgba(255,255,255,0)',
        // shadowRadius: 0,
        height: 85,
        backgroundColor: '#ffffff',
    }
})