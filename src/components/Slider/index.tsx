import * as React from 'react';

const Slider = () => {

    const sliderRef = React.useRef<HTMLInputElement>(null);

    const [value, setValue] = React.useState(50);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.valueAsNumber);
    }

    return (
        <div>
            <input ref={sliderRef} type="range" name="slider" min="1" max="100" value={value} onChange={(e) => onChange(e)} style={{ appearance: 'textarea' }} />
        </div>
    );
}

export default Slider;