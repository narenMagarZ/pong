package utils

// find index of item
func FindIndex[T any, X any](items []T, item X, compareFunc func(T, X) bool) int {
	for index, value := range items {
		if compareFunc(value, item) {
			return index;
		}
	}
	return -1;
}

func WithinRange(givenRange []int, target int) bool {
	return target > givenRange[0] && target < givenRange[1];
}