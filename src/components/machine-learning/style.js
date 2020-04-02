export default function(){
    return `
        <style>
            .font__weight--regular, html, body, input {
                font-weight: 400
            }

            .font__weight--medium, h1, h2, h3, h4 {
                font-weight: 500
            }

            .font__weight--semi-bold {
                font-weight: 600
            }

            .font__weight--bold, .faq__question {
                font-weight: 700
            }

            .font__size--xsmall {
                font-size: 11px
            }

            .font__size--small, .button__content--small, .machine, .section__title, .button--record, .gif__viewer, .gif__search-input, .output__sound-search-input, .output__sound-search-result, .output__sound-input, .output__speech-input {
                font-size: 14px
            }

            .font__size--normal, html, body, input, .intro__inner, .faq, .faq__question, .wizard__text {
                font-size: 16px
            }

            .font__size--large, .button, .output__selector-wrapper {
                font-size: 18px
            }

            .font__size--xlarge, .button__content--large {
                font-size: 24px
            }

            .font__size--xxlarge {
                font-size: 30px
            }

            .uppercase, .section__title, .button--record, .machine__status {
                text-transform: uppercase
            }

            html, body, input {
                font-family: 'Poppins', sans-serif;
            }

            h1, h2, h3, h4 {
                margin: 0;
            }

            .icon {
                display: inline-block;
                width: 14px;
                height: 14px;
                position: relative;
                top: 2px;
                margin-right: 5px;
                background-size: contain;
                background-position: center center;
                background-repeat: no-repeat
            }

            .icon--mic {
                background-image: url("/static/machinelearning/assets/mic-icon.svg")
            }

            .icon--cam {
                background-image: url("/static/machinelearning/assets/cam-icon.svg")
            }

            .icon--record {
                background-image: url("/static/machinelearning/assets/outputs/record-icon.svg")
            }

            .icon--stop {
                background-image: url("/static/machinelearning/assets/outputs/stop-icon.svg")
            }

            .icon--share {
                background-image: url("/static/machinelearning/assets/sharing-facebook.svg")
            }

            .icon--recorder {
                background-image: url("/static/machinelearning/assets/outputs/recorder-icon.svg")
            }

            .icon--speaker {
                background-image: url("/static/machinelearning/assets/speaker-icon.svg");
                background-position-y: 100%;
                background-size: 100%
            }

            .icon--large {
                width: 24px;
                height: 24px;
                top: 5px
            }

            .icon--facebook {
                position: absolute;
                width: 18px;
                height: 24px;
                bottom: 0;
                right: 0;
                display: inline-block;
                background-image: url("/static/machinelearning/assets/sharing-facebook.svg");
                background-size: contain;
                background-repeat: no-repeat
            }

            .icon--twitter {
                position: absolute;
                width: 28px;
                height: 30px;
                left: 0;
                top: 0;
                display: inline-block;
                background-image: url("/static/machinelearning/assets/sharing-twitter.svg");
                background-size: 20px;
                background-repeat: no-repeat;
                background-position: center center
            }

            .button {
                display: inline-block;
                text-decoration: none;
                text-align: center;
                color: #fff;
                margin: 0;
            }

            .button--disabled {
                pointer-events: none;
                -webkit-filter: grayscale(100%);
                opacity: .3
            }

            .button-set {
                height: 48px;
                width: 100%;
                text-align: left
            }

            .button__toggle {
                position: relative;
                width: 50%
            }

            .button__toggle:first-of-type {
                z-index: 2
            }

            .button__toggle:last-of-type {
                margin-left: -12px
            }

            .button__content {
                padding-left: 20px;
                padding-right: 20px
            }

            .button__content--small {
                width: 36px;
                height: 36px;
            }

            .button__mask {
                position: relative;
                overflow: hidden;
                width: 100%;
                height: 100%
            }

            .button__label {
                position: absolute;
            }

            .button__label br {
                display: none
            }

            .front-face {
                transition: fill .1s ease-out;
                fill: #cfd1d2
            }

            .left-face {
                transition: fill .1s ease-out;
                fill: #babcbe
            }

            .bottom-face {
                transition: fill .1s ease-out;
                fill: #a5a7aa
            }

            .front-face--blue, .button__toggle--selected .front-face {
                fill: #3e80f6
            }

            .left-face--blue, .button__toggle--selected .left-face {
                fill: #2874e2
            }

            .bottom-face--blue, .button__toggle--selected .bottom-face {
                fill: #2068d1
            }

            .front-face--grey {
                fill: #cfd1d2
            }

            .left-face--grey {
                fill: #babcbe
            }

            .bottom-face--grey {
                fill: #a5a7aa
            }

            .front-face--neutral {
                fill: #a4a6a9
            }

            .left-face--neutral {
                fill: #909295
            }

            .bottom-face--neutral {
                fill: #808082
            }

            .front-face--green {
                fill: #2baa5e
            }

            .left-face--green {
                fill: #249b54
            }

            .bottom-face--green {
                fill: #1a8741
            }

            .front-face--purple {
                fill: #c95ac5
            }

            .left-face--purple {
                fill: #b74eb7
            }

            .bottom-face--purple {
                fill: #a53fa5
            }

            .front-face--orange {
                fill: #dd4d31
            }

            .left-face--orange {
                fill: #cc402e
            }

            .bottom-face--orange {
                fill: #bf3025
            }

            .front-face--facebook {
                fill: #0066a8
            }

            .left-face--facebook {
                fill: #0080c4
            }

            .bottom-face--facebook {
                fill: #004a75
            }

            .front-face--twitter {
                fill: #00abe0
            }

            .left-face--twitter {
                fill: #89d9f7
            }

            .bottom-face--twitter {
                fill: #0080ab
            }

            .recording-share__button .button__label, .recording-start__button .button__label {
                top: 8px !important
            }

            @media screen and (max-width:900px) {
                .button__label br {
                    display: block
                }
                .button__content--small {
                    position: relative;
                    top: -6px
                }
                .button__color-title {
                    position: relative;
                    top: -36px;
                    display: block;
                    pointer-events: none
                }
            }

            .link {
                color: #3e80f6;
                text-decoration: underline
            }

            .link__icon {
                height: 50px;
                vertical-align: middle;
                padding-right: 10px
            }

            .link__text {
                color: #3e80f6;
                display: inline-block;
                text-decoration: underline
            }

            .link--grey {
                color: rgba(0, 0, 0, 0.2)
            }

            .link:hover .link__text {
                text-decoration: none
            }

            .link:hover {
                text-decoration: none
            }

            * {
                box-sizing: border-box
            }

            .hidden-text {
                visibility: hidden;
                position: absolute
            }

            body {
                margin: 0;
                background: #fff;
                color: #a4a6a8;
                user-select: none
            }

            body.no-scroll {
                width: 100%;
                height: 100%;
                overflow: hidden
            }

            .intro {
                background: #e9e9e9;
                position: fixed;
                z-index: 101;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center
            }

            .intro__sharing {
                flex: none;
                position: absolute;
                top: 20px;
                right: 20px
            }

            .intro__share-link {
                display: inline-block;
                width: 30px;
                height: 30px;
                margin: 0 0 0 5px;
            }

            .intro__share-link svg {
                margin: 15%;
                width: 70%;
                height: 70%;
                fill: #808184
            }

            .intro__share-link:hover svg {
                fill: #3e80f6
            }

            .intro__footer {
                align-items: flex-end;
                bottom: 0;
                display: flex;
                justify-content: space-between;
                left: 0;
                padding: 20px;
                position: absolute;
                width: 100%
            }

            .intro__footer-link--left {
                width: 300px
            }

            .intro__footer-link--right {
                color: #929395;
                font-size: 14px;
                position: relative;
                text-decoration: none;
                top: -5px
            }

            .intro__footer-image {
                width: 100%
            }

            .intro__content-mobile {
                display: none
            }

            .intro__content-mobile-incompatible {
                display: none
            }

            .intro__inner {
                text-align: center;
                padding-top: 30px;
                padding-bottom: 30px;
                max-width: 1060px;
                z-index: 2;
                width: 100vw;
            }

            .intro__cta {
                margin-top: 20px
            }

            .wizard__browser-warning {
                display: none
            }

            .intro__image {
                width: 100%;
                max-width: 400px
            }

            .intro__title {
                margin-top: 10px;
                width: 100%
            }

            .intro__title-image {
                width: 100%;
                height: 220px;
            }

            .intro__title-image.intro__title-image--desktop {
                display: block
            }

            .intro__title-image.intro__title-image--mobile {
                display: none
            }

            .intro__title-image--teachable {
                margin-right: 25px
            }

            .intro__text {
                max-width: 420px;
                margin-top: 50px;
                margin-bottom: 0;
                margin-left: auto;
                margin-right: auto;
                white-space: nowrap
            }

            .intro__text-break {
                display: block
            }

            .intro__video {
                position: relative;
                max-width: 800px;
                height: 0;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 20px;
                overflow: hidden
            }

            .intro__video-wrapper {
                position: relative;
                padding-bottom: 56.25%;
                padding-top: 25px;
                height: 0;
                margin-bottom: 20px
            }

            .intro__video-player {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000
            }

            @media screen and (max-width:900px) {
                .intro__inner {
                    padding-top: 0
                }
                .intro__content-desktop {
                    display: none
                }
                .intro__content-mobile {
                    background: #fff;
                    border-radius: 5px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                    display: block;
                    margin: 0 auto;
                    padding: 25px;
                    position: relative;
                    text-align: left;
                    width: 90%
                }
                .intro__content-mobile-incompatible {
                    display: none;
                    margin: 20px auto 0;
                    width: 80%;
                }
                .intro__content-mobile-incompatible a {
                    text-decoration: none
                }
                .intro__content-mobile-header {
                    color: #58595b;
                    line-height: 1.4
                }
                .intro__content-mobile-body {
                    color: #828386
                }
                .intro__content-mobile-ok {
                    margin-bottom: 0;
                    text-align: right
                }
                .intro__content-mobile-ok-link {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-right: -10px;
                    text-decoration: none
                }
                .intro__text {
                    font-size: 14px
                }
                .intro__button-social+.intro__button-social {
                    margin-left: 10px
                }
                .wizard__launch-skip {
                    font-size: 14px
                }
                .intro__title {
                    height: 70px;
                    margin-bottom: 10px;
                    margin-top: 0
                }
                .intro__cta {
                    margin-top: 20px
                }
                .intro__footer-link--left {
                    width: 50%
                }
                .intro__title-image {
                    height: 70px;
                    margin: 0 auto;
                    max-width: 280px;
                    width: 60%;
                }
                .intro__title-image.intro__title-image--desktop {
                    display: none
                }
                .intro__title-image.intro__title-image--mobile {
                    display: block;
                    width: 100%
                }
                .intro__title-image--teachable, .intro__title-image--machine {
                    margin-right: 0;
                    max-width: 80%;
                    height: 30px
                }
            }

            @media screen and (max-width:900px) and (orientation:landscape) {
                .intro__inner {
                    margin-top: -20px;
                    padding-bottom: 10px
                }
                .intro__title {
                    height: 50px
                }
                .intro__title-image {
                    height: 50px
                }
                .intro__content-mobile {
                    width: 80%
                }
                .intro__content-mobile-ok {
                    margin-top: -10px
                }
                .intro__content-mobile-header {
                    font-size: 14px
                }
                .intro__content-mobile-body {
                    font-size: 12px
                }
                .intro__footer {
                    padding: 5px 20px
                }
                .intro__footer-link--left {
                    width: 25%
                }
            }

            .faq {
                max-width: 1060px;
                margin: 0 auto;
                color: #6d6e71;
                position: relative;
                user-select: initial;
            }

            .faq__inner {
                width: 40%
            }

            .faq__question {
                margin-top: 40px;
                margin-bottom: 8px;
            }

            .faq__answer {
                margin-top: 0
            }

            .faq__video {
                width: 100%;
                margin-top: 25px
            }

            .faq-record-container {
                position: relative
            }

            .record {
                position: absolute;
                right: 0;
                top: 0;
                width: 20%;
                text-align: right
            }

            .record-text {
                color: #3e80f6;
                width: 100%;
                text-align: center;
                margin: 0 auto
            }

            @media screen and (max-width:1200px) {
                .faq-record-container {
                    margin-left: 20px;
                    margin-right: 20px
                }
                .record {
                    text-align: center;
                    width: 25%
                }
            }

            @media screen and (max-width:900px) {
                .faq {
                    margin: 0;
                    margin-bottom: 80px;
                    padding: 0 15px
                }
                .faq__inner {
                    width: 90%
                }
                .record {
                    display: none
                }
                .faq-record-container {
                    margin-left: 0;
                    margin-right: 0
                }
            }

            .footer {
                max-width: 1060px;
                margin-left: auto;
                margin-right: auto;
                margin-top: 60px;
                margin-bottom: 60px;
            }

            .footer .link {
                display: block;
                max-width: 400px;
                position: relative
            }

            .footer .link--privacy {
                margin-top: 10px;
                display: inline-block;
                color: rgba(0, 0, 0, 0.2)
            }

            @media screen and (max-width:900px) {
                .footer {
                    padding: 0 15px;
                }
                .footer .link {
                    display: block;
                    max-width: 400px;
                    position: relative
                }
                .footer__image {
                    width: 100%
                }
            }

            .disabled, .section--disabled, .learning__class--disabled, .wires--disabled {
                pointer-events: none
            }

            .dimmed {
                -webkit-filter: grayscale(25%);
                opacity: .3
            }

            .machine {
                position: relative;
                background: #ededee;
                padding-top: 50px;
                padding-bottom: 100px;
                text-align: center;
                letter-spacing: .3px
            }

            .machine__sections {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                max-width: 1360px;
                margin-left: auto;
                margin-right: auto
            }

            .section {
                width: 360px
            }

            .section__title {
                height: 30px;
                line-height: 30px;
            }

            .section__container {
                background: #fff;
                border-radius: 5px;
                padding: 15px
            }

            .section--input {
                position: relative;
                margin-top: 70px;
                width: 300px
            }

            .input__media {
                background: #ededee;
                overflow: hidden;
                position: relative;
                height: 270px
            }

            .input__media__activate {
                display: none;
                position: fixed;
                top: -20px;
                right: 0;
                width: 325px;
                background: #fff;
                padding: 20px;
                z-index: 999;
            }

            .input__media__activate .camera-icon {
                display: inline-block;
                height: auto;
                max-width: 25px;
                vertical-align: middle
            }

            .input__media__activate--mobile {
                display: none
            }

            .input__camera {
                width: 100%;
                height: 100%;
                position: relative;
                min-width: 227px;
                min-height: 227px
            }

            .input__media__flip {
                display: none
            }

            .input__camera-video {
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                min-width: 280px;
                min-height: 280px
            }

            .section--learning {
                position: relative;
                width: 360px
            }

            .learning-condensed {
                display: none
            }

            .learning__class {
                position: relative;
                margin-bottom: 20px;
                display: flex;
                text-align: left
            }

            .learning__class--neutral {
                color: #a4a6a9
            }

            .learning__class--green {
                color: #2baa5e
            }

            .learning__class--purple {
                color: #c95ac5
            }

            .learning__class--orange {
                color: #dd4d31
            }

            .learning__class:last-of-type {
                margin-bottom: 0
            }

            .examples {
                margin-right: 15px
            }

            .examples__wrapper {
                position: relative;
                width: 103px;
                height: 103px;
                overflow: hidden
            }

            .examples__close-icon {
                position: absolute;
                z-index: 2;
                top: 10px;
                right: 10px;
                width: 15px;
                height: 15px
            }

            .link--reset {
                position: absolute;
                z-index: 2;
                bottom: 0;
                text-align: center;
                width: 100%;
                height: 100%;
                vertical-align: middle;
                justify-content: center;
                align-items: center;
                display: none;
                cursor: pointer;
                background: rgba(0, 0, 0, 0.5);
                color: #fff
            }

            .examples__wrapper:hover .examples__close-icon {
                display: none
            }

            .examples__wrapper:hover .link--reset {
                display: flex
            }

            .examples__viewer {
                width: 103px;
                height: 103px;
                background: #ededee;
                transform: scaleX(-1)
            }

            .learning__class-column {
                width: 100%;
                display: flex;
                flex-direction: column
            }

            .button--record {
                margin-top: 15px;
                width: 100%;
                height: 50px;
                flex: none;
            }

            .machine__status {
                text-align: left;
                height: 25px;
                min-width: 75px
            }

            .confidence {
                flex: 1
            }

            .machine__meter {
                position: relative;
                width: 100%;
                height: 30px;
                background: #ededee
            }

            .machine__value {
                position: relative;
                z-index: 2;
                width: 0;
                height: 100%;
                background: #3e80f6;
                overflow: hidden
            }

            .machine__value--color-neutral {
                background: #a4a6a9
            }

            .machine__value--color-green {
                background: #2baa5e
            }

            .machine__value--color-purple {
                background: #c95ac5
            }

            .machine__value--color-orange {
                background: #dd4d31
            }

            .machine__meter--quality {
                margin-top: 10px
            }

            .machine__percentage {
                position: absolute;
                top: 0;
                left: 10px;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
                text-align: left
            }

            .machine__percentage--white {
                color: #fff
            }

            .quality__status {
                margin-top: 10px
            }

            .section--output {
                position: relative;
                margin-top: 80px;
                width: 300px
            }

            .output__player {
                position: relative
            }

            .output__container {
                width: 100%;
                height: 100%
            }

            .output__canvas {
                width: 100%;
                height: 100%
            }

            .divider {
                height: 1px;
                background: #e4e5e6;
                margin-top: 10px;
                margin-right: -10px;
                margin-bottom: 10px;
                margin-left: -10px
            }

            .output__controls {
                height: 40px;
                display: flex
            }

            .output__selector-wrapper {
                width: 100%;
                position: relative;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }

            .output_selector__option {
                flex: 1 1 1;
                cursor: pointer;
                margin: 0
            }

            .output_selector__option--selected, .output_selector__option:hover {
                color: #3e80f6;
                text-decoration: underline
            }

            .output_selector__option:hover {
                text-decoration: none
            }

            .wires {
                position: relative;
                width: 50px;
                height: 100%
            }

            .wires-svg {
                display: none
            }

            .wires__bulb {
                position: absolute;
                right: 0;
                top: 0;
                width: 18px;
                height: 34px;
                margin-top: -13px;
                background-image: url("/static/machinelearning/assets/leds.png");
                background-size: 60px;
                background-repeat: no-repeat;
                background-position-x: 0;
                background-position-y: 0
            }

            .wires__bulb-green {
                background-position-x: 0
            }

            .wires__bulb-purple {
                background-position-x: -22px
            }

            .wires__bulb-orange {
                background-position-x: -42px
            }

            .wires__bulb--selected {
                background-position-y: -34px
            }

            .button--share {
                height: 60px;
                margin-top: 20px
            }

            .recording-download-container {
                color: #fff;
                display: none;
                position: relative;
                margin-left: 15px;
                top: 29px;
            }

            .recording-download-container a {
                color: #fff
            }

            @media screen and (max-width:1200px) {
                .machine__sections {
                    margin-left: 20px;
                    margin-right: 20px
                }
            }

            @media screen and (max-width:900px) {
                .examples {
                    margin-right: 10px
                }
                .wires {
                    margin-top: 51px
                }
                .wires__bulb {
                    display: none
                }
                .machine {
                    padding: 0 15px;
                    padding-bottom: 40px;
                    padding-top: 60px
                }
                .machine__sections {
                    display: block;
                    margin-left: 0;
                    margin-right: 0
                }
                .section {
                    max-width: 510px;
                    margin: 0 auto;
                    width: 100%;
                }
                .section.learning.condensed .examples, .section.learning.condensed .confidence__status {
                    display: none
                }
                .section.learning.condensed .machine__meter {
                    height: 15px
                }
                .input {
                    max-width: 300px;
                }
                .input .section__container {
                    display: flex;
                    flex-direction: column
                }
                .input .input__media {
                    height: 270px;
                    order: 2;
                    margin-bottom: 0
                }
                .input .button-set {
                    order: 1;
                    margin-bottom: 10px
                }
                .section--output {
                    max-width: 300px;
                    top: -10px;
                }
                .section--output .section__container {
                    display: block
                }
                .section--learning {
                    height: auto;
                }
                .section--learning .section__container {
                    justify-content: center
                }
                .section--learning .button__label {
                    font-size: 12px
                }
                .section--learning .learning-condensed-button {
                    display: block;
                    border-top-left-radius: .4em;
                    border-top-right-radius: .4em;
                    display: block;
                    position: absolute;
                    top: -38px;
                    right: 0;
                    background: #fff;
                    width: 40px;
                    height: 40px;
                    z-index: 1;
                }
                .section--learning .learning-condensed-button .arrow-line {
                    background-color: #cfd1d2;
                    width: 10px;
                    height: 2px;
                    position: absolute;
                }
                .section--learning .learning-condensed-button .arrow-line:first-child {
                    transform: rotate(-45deg);
                    top: 10px
                }
                .section--learning .learning-condensed-button .arrow-line:nth-child(2) {
                    transform: rotate(45deg);
                    top: 25px
                }
                .section--learning .learning-condensed-button .arrow-line:nth-child(3) {
                    transform: rotate(-45deg);
                    top: 25px
                }
                .section--learning .learning-condensed-button .arrow-line:nth-child(4) {
                    transform: rotate(45deg);
                    top: 10px
                }
                .section--learning .learning-condensed-button .arrow-line:first-child, .section--learning .learning-condensed-button .arrow-line:nth-child(2) {
                    left: 19px
                }
                .section--learning .learning-condensed-button .arrow-line:nth-child(3), .section--learning .learning-condensed-button .arrow-line:nth-child(4) {
                    left: 12px
                }
                .section--learning.condensed .examples, .section--learning.condensed .confidence__status, .section--learning.condensed .button--record {
                    display: none
                }
                .section--learning.condensed .arrow-line:first-child, .section--learning.condensed .arrow-line:nth-child(3) {
                    transform: rotate(45deg)
                }
                .section--learning.condensed .arrow-line:nth-child(2), .section--learning.condensed .arrow-line:nth-child(4) {
                    transform: rotate(-45deg)
                }
                .wires-svg {
                    display: block
                }
                .wires--left, .wires--right {
                    height: auto;
                    width: 65vw;
                    max-width: 400px;
                    margin: 0 auto
                }
                .wire-base-green, .wire-base-purple, .wire-base-orange {
                    stroke: #ced1d2;
                    stroke-width: 3px
                }
                .wire-green.animate, .wire-purple.animate, .wire-orange.animate, .wire-right-green.animate, .wire-right-purple.animate, .wire-right-orange.animate {
                    stroke: #a4a6a8;
                    stroke-width: 4px;
                    stroke-dashoffset: 3;
                    stroke-dasharray: 3;
                    animation: dash .5s linear infinite
                }
                .wire--right-bulb-green-glow.bulb--selected {
                    stroke: #33ec5e;
                    filter: url("#blur-filter")
                }
                .wire--right-bulb-purple-glow.bulb--selected {
                    stroke: #f8f;
                    filter: url("#blur-filter")
                }
                .wire--right-bulb-orange-glow.bulb--selected {
                    stroke: #dd4d31;
                    filter: url("#blur-filter")
                }
                .wires--right {
                    top: -10px
                }
                @include clearfix();
                .section__title {
                    position: absolute;
                    top: -35px;
                    width: 100%;
                    margin: 0 auto;
                }
                .section__title.section__title--learning {
                    top: -30px
                }
                .section__title span {
                    background-color: #ededee
                }
                .section__container {
                    display: flex;
                    padding: 10px
                }
                .examples__wrapper {
                    width: 100%
                }
                .learning__class {
                    display: flex;
                    justify-content: flex-end;
                    flex-direction: column;
                    float: left;
                    width: 33.333%;
                    margin-bottom: 0;
                    margin-left: 3%
                }
                .button--record {
                    order: 3
                }
                .machine__status {
                    height: auto;
                    text-align: center
                }
                .examples__viewer {
                    width: 100%;
                    height: 90px
                }
                .confidence {
                    margin-right: 10px
                }
                .machine__meter {
                    height: 40px
                }
                .machine__percentage {
                    height: 40px;
                    line-height: 40px
                }
                .divider {
                    display: flex;
                    flex-direction: column;
                    float: left;
                    margin: 10px 0;
                    width: 100%
                }
                .quality__status {
                    text-align: center
                }
                .output__controls {
                    width: 100%
                }
                .input__media__activate--mobile {
                    display: block
                }
                .input__media__activate--desktop {
                    display: none
                }
                .input__media__flip {
                    background: transparent url("/static/machinelearning/assets/camera-flip.svg") no-repeat center center;
                    width: 70px;
                    height: 62px;
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    display: block
                }
                @-moz-keyframes dash {
                    from {
                        stroke-dashoffset: 30
                    }
                    to {
                        stroke-dashoffset: 0
                    }
                }
                @-webkit-keyframes dash {
                    from {
                        stroke-dashoffset: 30
                    }
                    to {
                        stroke-dashoffset: 0
                    }
                }
                @-o-keyframes dash {
                    from {
                        stroke-dashoffset: 30
                    }
                    to {
                        stroke-dashoffset: 0
                    }
                }
                @keyframes dash {
                    from {
                        stroke-dashoffset: 30
                    }
                    to {
                        stroke-dashoffset: 0
                    }
                }
            }

            .output__loading-screen {
                position: absolute;
                width: 100%;
                height: 100%;
                background: #ededee
            }

            .output__loading-title {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                color: #03a9f4
            }

            .gif__viewer {
                position: relative;
                width: 100%;
                height: 100%;
                background-color: #ededee;
                background-position: center center;
                background-size: cover;
                background-repeat: no-repeat;
            }

            .gif__edit {
                position: relative;
                width: 100%;
                height: 100%
            }

            .gif__edit-bar {
                width: 100%;
                height: 80px;
                bottom: 0;
                position: absolute;
                background: #fff;
                display: flex;
                justify-content: center
            }

            .gif__thumb {
                position: relative;
                width: 70px;
                height: 70px;
                cursor: pointer;
                margin: 10px 10px 0 10px
            }

            .gif__thumb-image-wrapper {
                position: relative;
                overflow: hidden;
                width: 80%;
                height: 80%;
                background: #000;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                background-position: center center;
                background-size: cover;
                background-repeat: no-repeat
            }

            .gif__thumb-image-wrapper:after {
                content: " ";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                background-image: url("/static/machinelearning/assets/edit-icon.svg");
                background-repeat: no-repeat;
                background-size: 40%;
                background-position: center center;
                display: none
            }

            .gif__thumb-border {
                position: absolute;
                width: 100%;
                height: 100%;
                border-width: 4px;
                border-style: solid;
                opacity: 1
            }

            .gif__thumb:hover .gif__thumb-image-wrapper:after {
                display: block
            }

            .gif__thumb-border--green {
                border-color: rgba(43, 170, 94, 0.2)
            }

            .gif__thumb-border--purple {
                border-color: rgba(201, 90, 197, 0.2)
            }

            .gif__thumb-border--orange {
                border-color: rgba(221, 77, 49, 0.2)
            }

            .gif__thumb:hover .gif__thumb-border--green, .gif__thumb-border--green-selected {
                border-color: #2baa5e
            }

            .gif__thumb:hover .gif__thumb-border--purple, .gif__thumb-border--purple-selected {
                border-color: #c95ac5
            }

            .gif__thumb:hover .gif__thumb-border--orange, .gif__thumb-border--orange-selected {
                border-color: #dd4d31
            }

            .gif__edit-viewer {
                width: 100%;
                position: absolute;
                bottom: 80px;
                top: 0;
                background-color: #ededee;
                background-position: center center;
                background-size: cover;
                background-repeat: no-repeat
            }

            .gif__canvas {
                width: 100%;
                height: 100%;
            }

            .gif__canvas canvas {
                width: 340px;
                height: 260px
            }

            .gif__search {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%
            }

            .gif__search-bar {
                position: absolute;
                width: 100%;
                height: 80px;
                background-color: #fff
            }

            .gif__search-input {
                width: 100%;
                height: 70px;
                border: 4px solid #cfd1d2;
                padding-left: 60px;
                outline: none;
            }

            .gif__search-back-button {
                left: 0;
                top: 0;
                width: 60px;
                height: 70px;
                position: absolute;
                background-color: transparent;
                cursor: pointer
            }

            .gif__search-back-button:after {
                content: " ";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
                width: 30px;
                height: 30px;
                background-image: url("/static/machinelearning/assets/back-arrow.svg");
                background-size: 30px;
                background-position: 0 0;
                background-repeat: no-repeat
            }

            .gif__search-back-button--a:after {
                background-position-y: 0
            }

            .gif__search-back-button--b:after {
                background-position-y: -30px
            }

            .gif__search-back-button--c:after {
                background-position-y: -60px
            }

            .gif__search-back-button--d:after {
                background-position-y: -90px
            }

            .gif__search-sponsor {
                width: 100%;
                height: 40px;
                background-image: url("/static/machinelearning/assets/giphy.svg");
                background-position: center center;
                background-size: 220px;
                background-repeat: no-repeat
            }

            .gif__search-scroll {
                position: absolute;
                overflow: hidden;
                overflow-y: scroll;
                width: 100%;
                top: 80px;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.9)
            }

            .gif__search-results {
                display: flex;
                justify-content: space-around
            }

            .gif__search-column {
                width: 50%
            }

            .gif__search-column:first-of-type {
                padding-left: 10px;
                padding-right: 5px
            }

            .gif__search-column:last-of-type {
                padding-left: 5px;
                padding-right: 10px
            }

            .gif__search-column img {
                width: 100%;
                display: block;
                margin-bottom: 10px;
                cursor: pointer
            }

            .gif__load-more {
                color: #fff;
                opacity: 0;
                cursor: pointer;
                padding-top: 10px;
                padding-bottom: 10px
            }

            .output__sound {
                position: absolute;
                width: 100%;
                height: 100%;
                background: #fff
            }

            .output__sound-on {
                position: absolute;
                width: 100%;
                height: 100%;
                background: #f00;
                z-index: 4
            }

            .output__sound-search {
                position: absolute;
                width: 100%;
                height: 100%;
                background: #fff;
                display: none;
                z-index: 3
            }

            .output__sound-search-bar {
                background: #fff;
                width: 100%;
                padding-bottom: 10px
            }

            .output__sound-back {
                position: absolute;
                width: 45px;
                height: 50px;
                background-color: rgba(0, 0, 0, 0);
                z-index: 2;
                top: 0;
                cursor: pointer;
            }

            .output__sound-back svg {
                position: absolute;
                width: 20px;
                top: 15px;
                left: 10px
            }

            .output__sound-back--green svg {
                fill: #2baa5e
            }

            .output__sound-back--purple svg {
                fill: #c95ac5
            }

            .output__sound-back--orange svg {
                fill: #dd4d31
            }

            .output__sound-search-input {
                display: block;
                width: 100%;
                height: 50px;
                border: 4px solid #ededee;
                padding-left: 40px;
                outline: none;
            }

            .output__sound-search-input--green {
                border-color: #2baa5e;
                color: #2baa5e
            }

            .output__sound-search-input--purple {
                border-color: #c95ac5;
                color: #c95ac5
            }

            .output__sound-search-input--orange {
                border-color: orange;
                color: orange
            }

            .output__sound-search-results {
                position: absolute;
                width: 100%;
                top: 60px;
                bottom: 0;
                overflow: scroll
            }

            .output__sound-search-results--green input {
                color: #2baa5e
            }

            .output__sound-search-results--green div:hover input {
                border-color: #2baa5e
            }

            .output__sound-search-results--purple input {
                color: #c95ac5
            }

            .output__sound-search-results--purple .output__sound-search-result-icon:after {
                background-position-y: -26px
            }

            .output__sound-search-results--purple div:hover input {
                border-color: #c95ac5
            }

            .output__sound-search-results--orange input {
                color: #dd4d31
            }

            .output__sound-search-results--orange .output__sound-search-result-icon:after {
                background-position-y: -52px
            }

            .output__sound-search-results--orange div:hover input {
                border-color: #dd4d31
            }

            .output__sound-search-result {
                height: 50px;
                margin-bottom: 10px;
                position: relative;
                cursor: pointer;
            }

            .output__sound-search-result-icon {
                position: absolute;
                width: 50px;
                height: 50px;
                background: transparent;
            }

            .output__sound-search-result-icon svg {
                pointer-events: none;
                width: 24px;
                position: absolute;
                top: 12px;
                left: 12px
            }

            .output__sound-search-result-icon--green svg {
                fill: #2baa5e
            }

            .output__sound-search-result-icon--purple svg {
                fill: #c95ac5
            }

            .output__sound-search-result-icon--orange svg {
                fill: #dd4d31
            }

            .output__sound-search-result-input {
                pointer-events: none;
                width: 100%;
                height: 50px;
                padding-left: 50px;
                color: inherit;
                border: 4px solid #ededee
            }

            .output__sound-class, .output__speech-class {
                text-align: left;
                display: flex;
                align-items: center;
                height: 33%;
                padding-left: 10px
            }

            .output__sound-delete {
                position: absolute;
                width: 40px;
                height: 42px;
                right: 4px;
                cursor: pointer;
                background: #fff;
                background-image: url("/static/machinelearning/assets/outputs/delete-icon.svg");
                background-size: 40%;
                background-repeat: no-repeat;
                background-position: center center
            }

            .output__sound-speaker, .output__speech-speaker {
                width: 52px;
                height: 50px;
                margin-right: 0;
                padding-right: 4px;
            }

            .output__sound-speaker svg, .output__speech-speaker svg {
                fill: #2baa5e;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .output__sound-speaker svg .sound-on, .output__speech-speaker svg .sound-on {
                display: none
            }

            .output__sound-speaker-class-icon {
                width: 70px;
                height: 70px;
                margin-left: 10px;
                margin-top: 5px
            }

            .output__sound-speaker--green svg {
                fill: #2baa5e
            }

            .output__sound-speaker--purple svg {
                fill: #c95ac5
            }

            .output__sound-speaker--orange svg {
                fill: #dd4d31
            }

            .output__sound-speaker--active svg .sound-on, .output__speech-speaker--active svg .sound-on {
                display: block
            }

            .output__sound-edit, .output__speech-edit {
                position: absolute;
                z-index: 2;
                width: 16px;
                height: 50px;
                opacity: .2;
                background-image: url("/static/machinelearning/assets/outputs/edit-icon.svg");
                background-position: 0 center;
                background-repeat: no-repeat;
                margin-left: 51px;
                left: 25px;
                pointer-events: none;
            }

            .output__sound-edit svg, .output__speech-edit svg {
                fill: #2baa5e;
                width: 100%;
                height: 100%;
                pointer-events: none
            }

            .output__sound-edit:after {
                content: "Play";
                position: absolute;
                top: 0;
                left: 25px;
                line-height: 50px;
                color: #000
            }

            .output__sound-edit--green svg {
                fill: #2baa5e
            }

            .output__sound-edit--purple svg {
                fill: #c95ac5
            }

            .output__sound-edit--orange svg {
                fill: #dd4d31
            }

            .output__sound-input {
                width: calc(100% - 50px);
                padding-left: 80px;
                padding-right: 40px;
                height: 50px;
                border: 4px solid #ededee;
                outline: none;
                position: relative;
                cursor: pointer;
            }

            .output__sound-input--green {
                color: #2baa5e
            }

            .output__sound-input--purple {
                color: #c95ac5
            }

            .output__sound-input--orange {
                color: #dd4d31
            }

            .output__sound-input--green:hover, .output__sound-input--green-selected {
                border-color: #2baa5e
            }

            .output__sound-input--purple:hover, .output__sound-input--purple-selected {
                border-color: #c95ac5
            }

            .output__sound-input--orange:hover, .output__sound-input--orange-selected {
                border-color: #dd4d31
            }

            .output__sound-input--nothing {
                color: rgba(0, 0, 0, 0.2)
            }

            .output__sound-on {
                display: flex;
                flex-wrap: wrap
            }

            .output__sound-speaker-class {
                position: relative;
                flex: 1 1 1;
                width: 50%;
                height: 50%;
                background: #fff
            }

            .output__sound-speaker-class:nth-child(1) {
                border-right: 1px solid #ededee;
                border-bottom: 1px solid #ededee
            }

            .output__sound-speaker-class:nth-child(2) {
                border-left: 1px solid #ededee;
                border-bottom: 1px solid #ededee
            }

            .output__sound-speaker-class:nth-child(3) {
                border-right: 1px solid #ededee;
                border-top: 1px solid #ededee
            }

            .output__sound-speaker-class:nth-child(4) {
                border-left: 1px solid #ededee;
                border-top: 1px solid #ededee
            }

            .output__sound-speaker-class-icon {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0)
            }

            .output__sound canvas {
                z-index: 100;
                position: absolute
            }

            .output__container--speech {
                background: #fff
            }

            .output__speech-speaker--green svg {
                fill: #2baa5e
            }

            .output__speech-speaker--purple svg {
                fill: #c95ac5
            }

            .output__speech-speaker--orange svg {
                fill: #dd4d31
            }

            .output__speech-edit:after {
                content: "Say";
                position: absolute;
                top: 0;
                left: 25px;
                line-height: 50px;
                color: #000
            }

            .output__speech-edit--green svg {
                fill: #2baa5e
            }

            .output__speech-edit--purple svg {
                fill: #c95ac5
            }

            .output__speech-edit--orange svg {
                fill: #dd4d31
            }

            .output__speech-delete {
                position: absolute;
                width: 40px;
                height: 42px;
                right: 4px;
                cursor: pointer;
                background: #fff;
                background-image: url("/static/machinelearning/assets/outputs/delete-icon.svg");
                background-size: 40%;
                background-repeat: no-repeat;
                background-position: center center
            }

            .output__speech-input {
                width: calc(100% - 50px);
                padding-left: 70px;
                padding-right: 40px;
                height: 50px;
                border: 4px solid #ededee;
                outline: none;
                position: relative;
            }

            .output__speech-input--green {
                color: #2baa5e
            }

            .output__speech-input--purple {
                color: #c95ac5
            }

            .output__speech-input--orange {
                color: #dd4d31
            }

            .output__speech-input--green:hover, .output__speech-input--green-selected {
                border-color: #2baa5e
            }

            .output__speech-input--purple:hover, .output__speech-input--purple-selected {
                border-color: #c95ac5
            }

            .output__speech-input--orange:hover, .output__speech-input--orange-selected {
                border-color: #dd4d31
            }

            .output__speech-input--nothing {
                color: rgba(0, 0, 0, 0.2)
            }

            .wizard {
                width: 100vw;
                background: #000;
                position: relative
            }

            .wizard--fixed {
                position: fixed;
                bottom: 0
            }

            .wizard__wrapper {
                position: relative;
                overflow: hidden;
                width: 100vw;
                z-index: 100
            }

            .wizard__inner {
                width: 100vw;
                max-width: 1180px;
                padding: 20px 20px;
                margin: 0 auto;
                display: flex;
                vertical-align: middle;
                justify-content: space-between
            }

            .wizard__sound-button {
                display: inline-block;
                width: 40px;
                height: 40px;
                margin: auto 20px auto 0;
                background: #000;
                display: none
            }

            .wizard__sound-icon {
                width: 30px;
                height: 30px;
                background-image: url("/static/machinelearning/assets/speaker-icon.svg");
                background-repeat: no-repeat;
                background-size: 100%;
                background-position-y: 0;
                margin: 5px
            }

            .wizard__sound-icon.wizard__sound-icon--on {
                background-position-y: -30px
            }

            .wizard__text {
                flex: 1;
                flex-direction: column;
                justify-content: center;
                margin: auto 0 auto 0;
                height: 52px;
                text-align: left;
                display: flex;
            }

            .wizard__timer {
                position: relative;
                margin-top: 5px;
                width: 80px;
                height: 2px;
                background: rgba(255, 255, 255, 0.27);
                overflow: hidden
            }

            .wizard__timer-fill {
                width: 0;
                height: 2px;
                background: #fff
            }

            .wizard__text-inner {
                width: 80%;
                vertical-align: middle;
                align-items: center
            }

            .wizard__skip-button {
                display: inline-block;
                flex: none;
                padding: 0 10px;
                height: 40px;
                line-height: 40px;
                text-transform: uppercase;
                background: #000;
                margin: auto 0 auto 20px;
                cursor: pointer;
                color: #fff;
                text-decoration: none
            }

            .wizard__arrow {
                position: absolute;
                z-index: 100 !important;
                top: 0;
                left: 0;
                pointer-events: none;
                display: none
            }

            .wizard__gif {
                z-index: 100000;
                position: absolute;
                width: 180px;
                height: 194px;
                background-image: url("/static/machinelearning/assets/wizard/gif-backdrop.svg");
                background-size: contain;
                background-position: 0 0;
                background-repeat: no-repeat;
                display: none
            }

            .wizard__gif-mask {
                position: relative;
                width: 140px;
                height: 140px;
                overflow: hidden;
                margin-top: 35px;
                margin-left: 20px
            }

            .wizard__gif-image {
                width: 100%
            }

            @media screen and (max-width:900px) {
                .wizard__arrow {
                    opacity: 0
                }
                .wizard__sound-button {
                    margin-right: 5px
                }
                .wizard__text-inner {
                    font-size: 11px;
                    width: 100%
                }
                .wizard__skip-button span {
                    display: none
                }
            }

            @media screen and (max-height:680px) {
                .wizard__gif {
                    top: -130px;
                    left: -100px
                }
            }

            .recording {
                transition: opacity .3s linear;
                position: absolute;
                z-index: 101;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                opacity: 0;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
            }

            .recording.fadein {
                opacity: 1
            }

            .recording__canvas {
                width: 680px;
                height: 340px;
                max-width: 100vw
            }

            .close-container {
                padding: 20px;
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0
            }

            .close__button {
                width: 30px;
                height: 30px;
                padding: 20px;
                background-image: url("/static/machinelearning/assets/close.svg");
                background-repeat: no-repeat;
                background-size: 100%;
                background-position-y: 0
            }

            .record__timer {
                text-align: center
            }

            .record__success {
                color: white;
                display: none;
                text-align: center
            }

            .recording-start__button, .recording-share__button {
                position: relative
            }

            .recording-start__button--disabled {
                pointer-events: none;
                filter: grayscale(40%)
            }

            #recording__legal {
                margin-top: 20px
            }

            #recording__checkbox {
                margin-right: 10px;
            }

            .button-container {
                text-align: center;
            }

            .animate {
                overflow: hidden;
            }

            .animate:after {
                position: relative;
                align-items: center;
                color: #fff;
                display: flex;
                filter: brightness(3);
                height: 48px;
                width: 100%;
                text-decoration: none;
                content: "";
                opacity: .2;
                background: #ed7572;
                position: absolute;
                animation: loader 10s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                bottom: 0;
                left: 0;
                width: 100%;
                margin-left: 0;
                z-index: 2
            }

            .sharing-notice {
                display: none;
                position: relative;
                top: 50px
            }

            .message {
                color: #fff;
                text-align: center
            }

            .restart {
                color: #fff;
                text-align: center;
            }

            .restart a {
                color: #fff
            }

            @media screen and (max-width:900px) {
                .recording {
                    display: none
                }
                .recording__canvas {
                    display: none
                }
            }

            @-moz-keyframes loader {
                0% {
                    transform: translateX(0%)
                }
                100% {
                    transform: translateX(100%)
                }
            }

            @-webkit-keyframes loader {
                0% {
                    transform: translateX(0%)
                }
                100% {
                    transform: translateX(100%)
                }
            }

            @-o-keyframes loader {
                0% {
                    transform: translateX(0%)
                }
                100% {
                    transform: translateX(100%)
                }
            }

            @keyframes loader {
                0% {
                    transform: translateX(0%)
                }
                100% {
                    transform: translateX(100%)
                }
            }

            .wrapper {
                overflow-x: hidden
            }

            .learning_container {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: flex-start;
                max-height: 511px;
                overflow-y: auto;
                overflow-x: hidden
            }

            .footer_btn {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                height: 80px
            }

            .footer_btn>button {
                border-radius: 10px;
                background-color: #fff;
                color: #03a9f4;
                height: 50px;
                font-size: 16px;
                width: 100px;
                margin-right: 10px;
                border: 1px solid #03a9f4;
                cursor: pointer
            }

            #mask {
                display: block;
                background: rgba(0, 0, 0, 0.3);
                width: calc(100vw);
                height: calc(100vh);
                position: fixed;
                z-index: 5
            }

            #newmodel_modal {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                background: #fff;
                width: 400px;
                height: 250px;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -200px;
                margin-top: -125px;
                z-index: 6
            }

            #newmodel_modal #close_newmodel {
                position: absolute;
                left: 350px;
                top: 10px;
                font-size: 20px;
                font-weight: bold;
                width: 20px;
                height: 20px;
                cursor: pointer;
                text-align: center;
                line-height: 20px
            }

            .input_learningclass_model {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center
            }

            #learningclass_model_count {
                border-radius: 5px;
                width: 100px;
                border: 1px solid #808080;
                text-align: center
            }

            #newmodel_confirm {
                margin-top: 50px;
                border: 1px solid #008000;
                border-radius: 5px;
                width: 70px;
                text-align: center;
                height: 30px;
                text-decoration: none;
                color: #008000;
                line-height: 30px
            }

            .right_section_container {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center
            }
        </style>`
}

export function scrollCSS(){
    return `
        <style>
            ::-webkit-scrollbar {
                width: 8px;
                background-color: rgba(184,184,184);
                }
            ::-webkit-scrollbar-thumb {
                background-color: rgba(184,184,184);
                border-radius: 8px;
                }
            ::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 8px rgba(184,184,184);
                background-color: #ededee;
            }
        </style>
    `
}