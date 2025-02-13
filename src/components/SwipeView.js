import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5;


const SwipeView = (props) => {
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
    const [localShowRecents, setLocalShowRecents] = useState(false);

    useEffect(() => {
        scrollTo(-SCREEN_HEIGHT / 1.5);
    }, []);


    /**
         * Animated style for the bottom sheet
         */
    const reanimatedBottomStyle = useAnimatedStyle(e => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })

    /**
     * Scrolls to a specific destination
     * @param {number} destination - The destination to scroll to
     */
    const scrollTo = (destination) => {
        'worklet'
        translateY.value = withSpring(destination, { damping: 50 })
    }

    const gesture = Gesture.Pan()
        .onStart(e => {
            context.value = { y: translateY.value }
        })
        .onUpdate(e => {
            translateY.value = e.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y)
        })
        .onEnd(e => {
            try {
                if (translateY.value > -MIN_TRANSLATE_Y) {
                    translateY.value = withSpring(SCREEN_HEIGHT);
                    runOnJS(setLocalShowRecents)(true);
                }
                if (translateY.value < -MIN_TRANSLATE_Y) {
                    translateY.value = withSpring(-MAX_TRANSLATE_Y);
                }
            } catch (error) {
                console.log('weee');
                // props.clearData();
            }
        })


    // pass the data on parent to disable view
    useEffect(() => {
        if (localShowRecents) {
            props.clearData();
        }
    }, [localShowRecents])


    const passvalue = () => {
        scrollTo(SCREEN_HEIGHT / 1.5);
        setTimeout(() => {
            props.clearData();
        }, 500);
    }


    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[CommonStyles.bottomsheet_container, reanimatedBottomStyle]}>
                <View style={CommonStyles.line} />

            <Text>Hello</Text>
            </Animated.View>
        </GestureDetector>
    )
}

export default SwipeView;