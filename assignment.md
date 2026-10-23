1. Design the 1-bit comparator circuit as given in the theory section. The circuit should take 2 inputs (A and B) and produce 3 outputs (A > B, A = B, and A < B). Verify that only one output is high at any given time for all possible input combinations.

2. Construct a 2-bit magnitude comparator using direct logic gate implementation. Given two 2-bit binary numbers A₁A₀ and B₁B₀, the circuit should output three comparison results: A > B, A = B, and A < B. Implement the logic equations provided in the theory section and verify the hierarchical comparison approach where MSB comparison takes priority.

3. Design a 2-bit comparator using subtractor circuit approach as described in the theory section. Use full adders with appropriate input inversions to implement A₁A₀ - B₁B₀ operation. Generate the comparison outputs by analyzing the subtraction result: equality from zero result (S₁'S₀'), greater than from carry output (C₁), and less than from absence of carry (C₁').

4. Analyze the relationship between direct logic gate implementation and subtractor-based implementation for 2-bit comparators. Compare the number of gates required, propagation delays, and complexity. Which method would be more suitable for larger bit widths (8-bit, 16-bit) and why?

5. Design a cascaded 4-bit comparator by connecting two 2-bit comparators. Explain how the outputs of the higher-order 2-bit comparator (for bits A₃A₂ vs B₃B₂) should be combined with the outputs of the lower-order comparator (for bits A₁A₀ vs B₁B₀) to generate the final 4-bit comparison result.
