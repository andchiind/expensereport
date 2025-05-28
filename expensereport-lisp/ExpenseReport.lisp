(defclass base-expense ()
  ((value :accessor value :initarg :value)))

(defmethod is-over-limit ((exp base-expense))
  nil)

(defmethod name ((b base-expense))
  "Foo!"
  #+nil
  (error "Not applicable to base class."))

(defmethod print-object ((obj base-expense) stream)
  (format stream "~64<~a:~;~6d~>~:[~; X~]"
          (name obj)
          (value obj) (is-over-limit obj)))

(defclass meal-expense (base-expense)
  ((is-meal-expense :accessor is-meal-expense :initform t :allocation :class)
   (maximum :accessor maximum :allocation :class)))

(defmethod is-over-limit ((meal meal-expense))
  (> (value meal) (maximum meal)))

(defclass other-expense (base-expense)
  ((is-meal-expense :accessor is-meal-expense :initform nil :allocation :class)))

(defclass breakfast (meal-expense)
  ((name :accessor name :initform "Breakfast" :allocation :class)
   (maximum :accessor maximum :initform 1000 :allocation :class)))

(defclass lunch (meal-expense)
  ((name :accessor name :initform "Lunch" :allocation :class)
   (maximum :accessor maximum :initform 2000 :allocation :class)))

(defclass dinner (meal-expense)
  ((name :accessor name :initform "Dinner" :allocation :class)
   (maximum :accessor maximum :initform 5000 :allocation :class)))

(defclass car-rental (other-expense)
  ((name :accessor name :initform "Car Rental" :allocation :class)))

(defmacro make-expense (&key type amount)
  `(make-instance ',type :value ,amount))

(defun print-report (&rest expenses)
  (let ((meal-expenses 0)
        (total-expenses 0))
    (format t "~&Expenses~%")
    (dolist (expense expenses)
      (when (is-meal-expense expense)
        (incf meal-expenses (value expense)))
      (incf total-expenses (value expense))
      (format t "~a~%" expense))
    (format t "~64<~a:~;~6d~>~%" "Meal Expenses" meal-expenses)
    (format t "~64<~a:~;~6d~>~%" "Total Expenses" total-expenses)))

#||
(print-report
    (make-expense :type breakfast :amount 1000)
    (make-expense :type breakfast :amount 1001)
    (make-expense :type lunch :amount 2000)
    (make-expense :type lunch :amount 2001)
    (make-expense :type dinner :amount 5000)
    (make-expense :type dinner :amount 5001)
    (make-expense :type car-rental :amount 4))
||#