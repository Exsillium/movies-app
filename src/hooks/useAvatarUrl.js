import { useCallback } from "react";

export default function useAvatarUrl(accountData) {
	const getAvatarUrl = useCallback(
		(sizeType = "small") => {
			const size = sizeType === "small" ? 45 : 96; // TMDB sizes (e.g., w45, w185)
			const gravatarSize = sizeType === "small" ? 25 : 50;

			if (accountData?.avatar?.tmdb?.avatar_path) {
				return `https://image.tmdb.org/t/p/w${size}${accountData.avatar.tmdb.avatar_path}`;
			}
			if (accountData?.avatar?.gravatar?.hash) {
				return `https://www.gravatar.com/avatar/${accountData.avatar.gravatar.hash}?s=${gravatarSize}&d=mp`;
			}
			return null;
		},
		[accountData]
	);
	const smallAvatarUrl = getAvatarUrl("small");
	const largeAvatarUrl = getAvatarUrl("large");
	return { smallAvatarUrl, largeAvatarUrl };
}
