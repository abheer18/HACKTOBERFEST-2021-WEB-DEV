import {StatusBar} from 'expo-status-bar';
import React, {useRef, useState,useEffect} from 'react';
import {TouchableWithoutFeedback, StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity} from 'react-native';

export default function App() {
    const [game, setGame] = useState({
        blueReady: false,
        redReady: false
    })
    const [red, setRed] = useState(50);
    const [blue, setBlue] = useState(50);
    const [whoCheat, setWhoCheat] = useState<string | null>(null);
    const [winner, setWinner] = useState<string | null>(null);
    const scaleAnimation = useRef(new Animated.Value(0));

    const winnerAnimation = () => {
        Animated.spring(scaleAnimation.current, {
            useNativeDriver: true,
            toValue: 1,
            tension: 10,
            friction: 1
        }).start();
    }

    const boost = (team: string) => {
        //boost if about to lose
        const value = team === 'red' ? red : blue;
        if (value <= 20) return 2;
        else if (value <= 10) return 3;
        return 1;
    }
    const redClickCount = useRef(0);
    const blueClickCount = useRef(0);

    const resetGame = () => {
        setBlue(50);
        setRed(50);
        redClickCount.current = 0;
        blueClickCount.current = 0;
        scaleAnimation.current = new Animated.Value(0);
        setGame({
            redReady: false,
            blueReady: false
        });
        setWinner(null);
        setWhoCheat(null);
    }

    useEffect(() => {
        if (winner!==null){
            winnerAnimation();
        }
    }, [winner]);


    const onPlatformPress = (team: string) => {
        const isRed = team == 'red';
        const diff = boost(team);
        const value = isRed ? red : blue;
        if (Math.ceil(value) >= 100) {
            setWinner(team);
            return;
        }

        setBlue(prev => {
            return prev + (isRed ? diff * -1 : diff);
        });
        setRed(prev => {
            return prev + (isRed ? diff : diff * -1);
        })
    }

    const onLongPress = (team: string) => {
        const isRed = team === 'red';
        setRed(isRed ? 0 : 100);
        setBlue(isRed ? 100 : 0);
        setWhoCheat(isRed ? 'red' : 'blue');
    }



    const onDoubleclick = (team: string) => {
        if (team === 'red') {
            redClickCount.current += 1;
            if (redClickCount.current >= 2) {
                setGame(prev => {
                    return {
                        ...prev,
                        redReady: true
                    }
                })
            }
        } else {
            blueClickCount.current += 1;
            setGame(prev => {
                return {
                    ...prev,
                    blueReady: true
                }
            })
        }
    }

    if (!game.redReady || !game.blueReady) {
        return (
            <View style={styles.body}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => onDoubleclick('red')}>
                        <View style={[styles.red, {height: '50%'}, styles.australia]}>
                            <Text style={!game.redReady ? styles.textMid : styles.textReady}>
                                {!game.redReady ? 'Double click to ready.' : 'Ready !!'}
                            </Text>
                            <Text style={{color:colors.white,fontSize:15}}>( tap to win !! )</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => onDoubleclick('blue')}>
                        < View style={[styles.blue, {height: '50%'}]}>
                            <Text style={!game.blueReady ? styles.textMid : styles.textReady}>
                                {!game.blueReady ? 'Double click to ready.' : 'Ready !!'}
                            </Text>
                            <Text style={{color:colors.white,fontSize:15}}>( tap to win !! )</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.body}>
            {winner !== null && (<Animated.View style={[
                styles.winnerBackground,
                {
                    transform: [{
                        scale: scaleAnimation.current,
                    }],
                    backgroundColor: winner === 'red' ? colors.red : colors.blue,
                }
            ]}>
                <View style={[styles.winnerContainer,winner === 'red' ? styles.australia : {}]}>
                    <Text style={[styles.textMid, {textAlign: 'center', textTransform: 'capitalize'}]}>
                        {`${whoCheat !== null ? `${whoCheat} is cheating!!\n\n` : ''}🎉 🥳 🎉 🥳 🎉\n\nCongratulations !! \n${winner} Win The Game !!\n\n🎉 🥳 🎉 🥳 🎉`}
                    </Text>
                    <TouchableOpacity style={styles.btnPlayAgain} onPress={resetGame}>
                        <Text style={{color: winner === 'red' ? colors.red : colors.blue}}>
                            Play Again !!
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>)}
            <StatusBar hidden/>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onLongPress={() => onLongPress('red')}
                    onPressIn={() => onPlatformPress('red')}>
                    <View style={[styles.red, {height: `${red}%`}]}>
                        <Text style={[styles.textMid, styles.australia]}>{Math.round(red)}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onLongPress={() => onLongPress('blue')}
                    onPressIn={() => onPlatformPress('blue')}>
                    <View style={[styles.blue, {height: `${blue}%`}]}>
                        <Text style={styles.textMid}>{Math.round(blue)}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

const colors = {
    blue: '#0688FF',
    red: '#C23633',
    darkRed: '#960300',
    darkBlue: 'navy',
    white: '#fff'
}

const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: colors.white,
        },
        container: {
            flex: 1,
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width
        },
        red: {
            backgroundColor: colors.red,
            alignItems: 'center',
            justifyContent: 'center'
        },
        blue: {
            backgroundColor: colors.blue,
            alignItems: 'center',
            justifyContent: 'center'
        },
        textMid: {
            fontSize: 30,
            color: colors.white,
            fontWeight: 'bold'
        },
        australia: {
            transform: [{
                rotateX: '180deg'
            }, {
                rotateY: '180deg'
            }]
        },
        textReady: {
            fontSize: 50,
            color: colors.white,
            fontWeight: 'bold'
        },
        btnPlayAgain: {
            marginTop: 30,
            backgroundColor: colors.white,
            borderRadius: 5,
            paddingHorizontal: 40,
            paddingVertical: 10
        },
        winnerBackground: {
            flex: 1,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            position: 'absolute',
            zIndex: 1,

        },
        winnerContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        }
    })
;
