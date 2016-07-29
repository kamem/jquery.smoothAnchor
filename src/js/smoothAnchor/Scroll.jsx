const $STAGE = $('html,body');
export const scrollStop = () => $STAGE.queue([]).stop();

export class Scroll {
	constructor({
			easing = 'easeOutQuart',
			speed = 1000,
			delay = 0,
			isAddHash = true,
			isTopScroll = true,
			isLeftScroll = true
		}) {
			this.easing = easing;
			this.speed = speed;
			this.delay = delay;
			this.isAddHash = isAddHash;
			this.isTopScroll = isTopScroll;
			this.isLeftScroll = isLeftScroll;
	}

	getScrollPosition(target) {
		const isPositionHash = typeof target === 'string' && isFinite(parseInt(target.slice(1,2)));
		const position = isPositionHash ? target.slice(1).split(',') : $(target).offset();

		return {
			scrollTop: !target ? 0 :
				isPositionHash ? parseInt(position[1]) : position.top,
			scrollLeft: !target ? 0 :
				isPositionHash ? parseInt(position[0]) : position.left
		};
	}

	getScrollFixPosition(scrollTop, scrollLeft) {
		const maxScrollTop = $(document).height() - $(window).height();
		if(scrollTop > maxScrollTop) scrollTop = Math.max(maxScrollTop, 0);

		const maxScrollLeft = $(document).width() - $(window).width();
		if(scrollLeft > maxScrollLeft) scrollLeft = Math.max(maxScrollLeft, 0);

		if(this.isTopScroll && this.isLeftScroll) return {scrollTop, scrollLeft};
		else if(this.isTopScroll) return {scrollTop};
		else if(this.isLeftScroll) return {scrollLeft};
	}

	scrollStart(target, complate) {
		scrollStop();

		const {
			scrollTop,
			scrollLeft
		} = this.getScrollPosition(target);

		let isComplate = false;
		$STAGE.delay(this.delay).animate(
			this.getScrollFixPosition(scrollTop, scrollLeft),
			this.speed,
			this.easing,
			() => {
				if(isComplate) return;
				isComplate = true;
				if(this.isAddHash &&
					typeof target === 'string') {
					location.hash = target;
				}
				if(complate) complate({target, scrollTop, scrollLeft});
			}
		);
	}
}