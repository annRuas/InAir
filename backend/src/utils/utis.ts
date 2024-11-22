
export function calculateAQILevel(globalIndex: number) {
        if (globalIndex >= 0 && globalIndex <= 49) {
            return 'good';
        }
        if (globalIndex >= 50 && globalIndex <= 99) {
            return 'moderate';
        }
        if (globalIndex >= 100 && globalIndex <= 149) {
            return 'unhealthy-sensitive';
        }
        if (globalIndex >= 150 && globalIndex <= 199) {
            return 'unhealthy';
        }
        if (globalIndex >= 200 && globalIndex <= 299) {
            return 'very-unhealthy';
        }
        if (globalIndex >= 300) {
            return 'hazardous';
        }
        return 'error';
    }