OBJS = main.o

run: main
	./a.out

main: ${OBJS}
	gcc -Og ${OBJS}

build: ${OBJS}
	gcc -O1 ${OBJS}

clean:
	rm *.o a.out
