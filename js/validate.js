{
	// 全角英数字（アルファベットと数字）のみを半角に変換。(全角スペースや特殊記号などは変換しない)
	function replaceFullWidthToEn() {
		const inputElements = document.querySelectorAll(".js-full-width-character");
		if (inputElements.length) {
			inputElements.forEach(function (targetElement) {
				targetElement.addEventListener("input", function (e) {
					e.target.value = e.target.value.replace(
						/[Ａ-Ｚａ-ｚ０-９]/g,
						function (s) {
							return String.fromCharCode(s.charCodeAt(0) - 65248);
						}
					);
				});
			});
		}
	}
	replaceFullWidthToEn();

	function removeHyphen() {
		const inputElements = document.querySelectorAll(".js-tel");
		if (inputElements.length) {
			inputElements.forEach(function (targetElement) {
				targetElement.addEventListener("input", function (e) {
					e.target.value = e.target.value.replace(/-/g, "");
				});
			});
		}
	}
	removeHyphen();

	function checkNameValidity() {
		// name validation
		const nameElement = document.querySelector(".js-validate-name");
		const nameError = document.querySelector('[data-error="name"]');
		if (nameElement) {
			const nameValue = nameElement.value;
			if (nameValue === "") {
				nameElement.classList.add("is-error");
				nameError.textContent = "必須項目です";
				return false;
			} else if (nameValue.length > 60) {
				nameElement.classList.add("is-error");
				nameError.textContent = "60文字以内でご入力ください。";
				return false;
			} else {
				nameElement.classList.remove("is-error");
				nameError.textContent = "";
				return true;
			}
		} else {
			return true;
		}
	}

	function checkCompanyValidity() {
		// company validation
		const companyElement = document.querySelector(".js-validate-company");
		const companyError = document.querySelector('[data-error="company"]');
		if (companyElement) {
			const companyValue = companyElement.value;
			if (companyValue == "") {
				companyElement.classList.add("is-error");
				companyError.textContent = "必須項目です";
				return false;
			} else {
				companyElement.classList.remove("is-error");
				companyError.textContent = "";
				return true;
			}
		} else {
			return true;
		}
	}

	function checkEmailValidity() {
		// email validation
		const emailElement = document.querySelector(".js-validate-email");
		const emailError = document.querySelector('[data-error="email"]');
		let emailRegex =
			/^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{1,}$/;

		if (emailElement) {
			const emailValue = emailElement.value;
			if (emailValue == "") {
				emailElement.classList.add("is-error");
				emailError.textContent = "必須項目です";
				return false;
			} else if (!emailRegex.test(emailValue)) {
				emailElement.classList.add("is-error");
				emailError.textContent = "メールアドレスを正しく入力してください";
				return false;
			} else {
				emailError.textContent = "";
				emailElement.classList.remove("is-error");
				return true;
			}
		} else {
			return true;
		}
	}

	function checkTelValidity() {
		// tel validation
		const telElement = document.querySelector(".js-validate-tel");
		const telError = document.querySelector('[data-error="tel"]');
		var telRegex = /^[0-9\-]+$/;

		if (telElement) {
			const telValue = telElement.value;
			const telDigits = telValue.replace(/-/g, "");
			if (telValue == "") {
				telElement.classList.add("is-error");
				telError.textContent = "必須項目です";
				return false;
			} else if (
				!telRegex.test(telValue) ||
				telDigits.length < 10 ||
				telDigits.length > 13
			) {
				telElement.classList.add("is-error");
				telError.textContent = "電話番号を正しく入力してください";
				return false;
			} else {
				telElement.classList.remove("is-error");
				telError.textContent = "";
				return true;
			}
		} else {
			return true;
		}
	}

	function checkMessageValidity() {
		// message validation
		const messageElement = document.querySelector(".js-validate-message");
		const messageError = document.querySelector('[data-error="message"]');

		if (messageElement) {
			const messageValue = messageElement.value;
			if (messageValue == "") {
				messageElement.classList.add("is-error");
				messageError.textContent = "必須項目です";
				return false;
			} else {
				messageElement.classList.remove("is-error");
				messageError.textContent = "";
				return true;
			}
		} else {
			return true;
		}
	}

	function checkPurposeValidity() {
		// purpose validation
		const purposeContainer = document.querySelector(".js-validate-purpose");
		const purposeError = document.querySelector('[data-error="purpose"]');
		let isChecked = false;

		if (purposeContainer) {
			const purposeElements = purposeContainer.querySelectorAll(
				'input[type="checkbox"]'
			);
			// Check if any checkbox is checked
			purposeElements.forEach((checkbox) => {
				if (checkbox.checked) {
					isChecked = true;
				}
			});

			if (!isChecked) {
				// If no checkbox is checked, add error class and display error message
				purposeElements.forEach((checkbox) => {
					checkbox.classList.add("is-error");
				});
				purposeError.textContent = "必須項目です";
				return false;
			} else {
				// If any checkbox is checked, remove error class and clear error message
				purposeElements.forEach((checkbox) => {
					checkbox.classList.remove("is-error");
				});
				purposeError.textContent = "";
				return true;
			}
		} else {
			return true;
		}
	}

	function validateOnSubmit() {
		const formElement = document.querySelector(".js-form");

		formElement.addEventListener("submit", function (e) {
			let isFormValid = true;

			isFormValid = checkNameValidity() && isFormValid;
			isFormValid = checkCompanyValidity() && isFormValid;
			isFormValid = checkEmailValidity() && isFormValid;
			isFormValid = checkTelValidity() && isFormValid;
			isFormValid = checkMessageValidity() && isFormValid;
			isFormValid = checkPurposeValidity() && isFormValid;

			if (!isFormValid) {
				e.preventDefault();
			}
		});
	}
	validateOnSubmit();

	document.addEventListener( 'wpcf7mailsent', function( event ) {
		location = '/thanks/';
	}, false );
}
