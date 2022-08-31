function ChangeValue(){
	const refdate = 1596204000000, // July 1 2020
		refpop = 7794798739, // population as per Worldometers
		refinc = 81330639; // annual increase as per Worldometers
	const refrate = (refpop + refinc) / refpop;
	/**
	 * Population as of July 1, 2020, multiplied by the annual growth rate.
	 *
	 * First: within parentheses,
	 * 	get number of milliseconds between NOW and July 1, 2020
	 * 	divided by the number of milliseconds in a year,
	 * 	which gives us the fractional number of years since reference date.
	 * Second:
	 * 	because exponentiation has operator precidence, we exponentiate the
	 * 	annual percentage growth (refrate) by number of years, yielding the
	 * 	percentage growth (perportion) since July 1, 2020 (about 1% or 2% as of 2022)
	 * Lastly:
	 * 	Multiply the July 2020 population by the growth percentage since then.
	 *
	 */
	const estpop = refpop * refrate ** ((+new Date - refdate) / (31556952 * 1000))
	const numberstring = new Intl.NumberFormat().format(Math.floor(estpop));
	let popcounters = document.querySelectorAll(".population-count-count").forEach(el => el.innerHTML = numberstring);
}
setInterval(ChangeValue, 1000)

// 2019, 2022 figures estimate 5% increase as per https://www.worldometers.info/world-population
// older figures from 1990's, 1.05% rate.
// We are saying 1 birth every 8 seconds, one death every 12 seconds, so population increases by 1 every 24 seconds.
// There are about πe+7 (30 million-ish) seconds in a year, which makes about 1.3 million increase per year.
// This would be agrowth rate of about .1666%
// However, Worldometer suggests 81 million increase per year, or a ~1.05% growth rate.
// Population growth peaked in the 1970s and has been falling off ever since.
