import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const intervalRef = useRef(null);

	useEffect(() => {
		return () => clearInterval(intervalRef.current);
	}, []);

	function updateElapsedTime() {
		setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
	}

	function startTimer() {
		setIsRunning(true);
		intervalRef.current = setInterval(updateElapsedTime, 1000);
	}

	function stopTimer() {
		setIsRunning(false);
		clearInterval(intervalRef.current);
	}

	function resetTimer() {
		setIsRunning(false);
		clearInterval(intervalRef.current);
		setElapsedTime(0);
	}

	function formatElapsedTime() {
		const seconds = Math.floor((elapsedTime / 1000) % 60);
		const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
		const hours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24);
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}

	function formatAsTimeObject() {
		const seconds = Math.floor((elapsedTime / 1000) % 60);
		const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
		const hours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24);
		return { hours, minutes, seconds };
	}

	function formatAs(f = "h") {
		const seconds = elapsedTime / 1000;
		const minutes = seconds / 60;
		const hours = minutes / 60;
		return f === "h"
			? hours
			: f === "m"
			? minutes
			: Math.floor(seconds);
	}

	return {
		startTimer,
		stopTimer,
		resetTimer,
		formatElapsedTime,
		formatAsTimeObject,
		formatAs,
		isRunning,
	};
};

export default Stopwatch;
