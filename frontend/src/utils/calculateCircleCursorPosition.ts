/** REFACTOR FUNCTION AFTER TO BECOME MORE GLOBAL */
export function calculateCircleCursorPosition(globalIndex: number) {
    const globalIndexGraphic = globalIndex <= 200 ? globalIndex * (200 / 150) : globalIndex * ((200 / (150 + (((globalIndex - 200) / 200) * 50))));

    const globalIndexDegrees = 180 - ((globalIndexGraphic / 400) * 180);

    const radians = globalIndexDegrees * (Math.PI / 180);

    const rotateDegree = 160 - globalIndexDegrees;
    const rotateBaseline = (rotateDegree) > 360 ? rotateDegree - 360 : rotateDegree

    return {
        cos: (Math.cos(radians) * 70),
        sin: (Math.sin(radians) * 70),
        rotate: rotateBaseline + 'deg'
    }
}