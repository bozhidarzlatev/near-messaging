const keyStrokesounds = [
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3"),
];

function useKeyboardSound() {
    const playRandomKeyStokeSound = () => {
        const randomSound = keyStrokesounds[Math.random() * keyStrokesounds.length];

        randomSound.currentTime = 0;
        randomSound.play().catch(error => console.log("Audio play failed:" , error))
    }
    
    return {playRandomKeyStokeSound}
}

export default useKeyboardSound