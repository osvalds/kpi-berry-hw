```
 __    __  _______   ______        _______                                          
/  |  /  |/       \ /      |      /       \                                         
$$ | /$$/ $$$$$$$  |$$$$$$/       $$$$$$$  |  ______    ______    ______   __    __ 
$$ |/$$/  $$ |__$$ |  $$ |        $$ |__$$ | /      \  /      \  /      \ /  |  /  |
$$  $$<   $$    $$/   $$ |        $$    $$< /$$$$$$  |/$$$$$$  |/$$$$$$  |$$ |  $$ |
$$$$$  \  $$$$$$$/    $$ |        $$$$$$$  |$$    $$ |$$ |  $$/ $$ |  $$/ $$ |  $$ |
$$ |$$  \ $$ |       _$$ |_       $$ |__$$ |$$$$$$$$/ $$ |      $$ |      $$ \__$$ |
$$ | $$  |$$ |      / $$   |      $$    $$/ $$       |$$ |      $$ |      $$    $$ |
$$/   $$/ $$/       $$$$$$/       $$$$$$$/   $$$$$$$/ $$/       $$/        $$$$$$$ |
                                                                          /  \__$$ |
                                                                          $$    $$/ 
                                                                           $$$$$$/  
```


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running UI locally

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running "Backend" locally
Navigate to the `api` folder and run
###`python app.py`

## Some take-ways _(excuses)_

- I seriously underestimated how tricky this homework is going to be;
- I haven't worked with React or JavaScript in basically any capacity in 15 months so it was a 
strategic mistake to try and use only functional components and Hooks. Even though there's a pretty good
re-agent -> react mental model conversion, it didn't apply as well to purely functional version. I struggled
a lot with grokking `useState` peculiarities in a short time (like the shallow comparisons, immutability requirements);
- The UI could use a lot of polish - one of the things I didn't manage to fix before deadline was the number
queries it makes on `conditions` state changes. Limiting/debouncing it would massively improve usability;
- I have never worked with Python. Somehow I have avoided it my whole carrer. Also, I had never seen Flask so 
I needed to google everything. It kinda reminds the simplicity of [ring](https://github.com/ring-clojure/ring). As a 
result the Python code I wrote ,probably, is the most un-idiomatic, least performant Python ever written. On the other
hand, it was a fun challenge writing some backend that's more than changing small things in already existing codebase.
- All in all, fun homework assignment, learned a ton, bummed that I had to spend so much time googling and dealing with 
syntax issues.
 
